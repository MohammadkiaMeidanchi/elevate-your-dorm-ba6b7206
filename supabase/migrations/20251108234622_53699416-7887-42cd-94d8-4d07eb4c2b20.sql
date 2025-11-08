-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create items table
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on items
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for items updated_at
CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON public.items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for user_roles (admins only)
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert categories"
  ON public.categories FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories"
  ON public.categories FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories"
  ON public.categories FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for items
CREATE POLICY "Anyone can view items"
  ON public.items FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert items"
  ON public.items FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update items"
  ON public.items FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete items"
  ON public.items FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for item images
INSERT INTO storage.buckets (id, name, public)
VALUES ('item-images', 'item-images', true);

-- Storage RLS policies
CREATE POLICY "Anyone can view item images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'item-images');

CREATE POLICY "Admins can upload item images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'item-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update item images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'item-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete item images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'item-images' AND public.has_role(auth.uid(), 'admin'));

-- Insert initial categories
INSERT INTO public.categories (name, display_order) VALUES
  ('Lights', 1),
  ('Decor', 2),
  ('Storage', 3),
  ('Comfort', 4),
  ('Sports', 5);

-- Insert initial items with existing data
INSERT INTO public.items (name, price, category_id, image_url) VALUES
  -- Lights
  ('LED Strip', 14.99, (SELECT id FROM public.categories WHERE name = 'Lights'), 'led-strip.jpg'),
  ('Jellyfish Light', 14.99, (SELECT id FROM public.categories WHERE name = 'Lights'), 'jellyfish-light.jpg'),
  ('Flower LED', 14.99, (SELECT id FROM public.categories WHERE name = 'Lights'), 'flower-led.jpg'),
  ('Skylight', 24.99, (SELECT id FROM public.categories WHERE name = 'Lights'), 'skylight.jpg'),
  
  -- Decor
  ('Flags', 9.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'flags.jpg'),
  ('Poster', 9.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'poster.jpg'),
  ('Artificial Flowers', 9.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'artificial-flowers.jpg'),
  ('Artificial Candles', 9.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'artificial-candles.jpg'),
  ('World Map', 14.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'world-map.jpg'),
  ('Vinyl Set', 24.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'vinyl-set.jpg'),
  ('Clock', 9.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'clock.jpg'),
  ('Football Wall Art', 14.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'football-wall-art.jpg'),
  ('Football Decor', 14.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'football-decor.jpg'),
  ('Cat Plush', 14.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'cat-plush.jpg'),
  ('Pig Plush', 14.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'pig-plush.jpg'),
  ('Boba Plush', 14.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'boba-plush.jpg'),
  ('Plush Toy', 14.99, (SELECT id FROM public.categories WHERE name = 'Decor'), 'plush-toy.jpg'),
  
  -- Storage
  ('Shoe Rack', 24.99, (SELECT id FROM public.categories WHERE name = 'Storage'), 'shoe-rack.jpg'),
  
  -- Comfort
  ('Rug', 14.99, (SELECT id FROM public.categories WHERE name = 'Comfort'), 'rug.jpg'),
  ('Mouse Pad', 14.99, (SELECT id FROM public.categories WHERE name = 'Comfort'), 'mouse-pad.jpg'),
  ('RGB Mouse Pad', 14.99, (SELECT id FROM public.categories WHERE name = 'Comfort'), 'rgb-mouse-pad.jpg'),
  ('Inflatable Bean Bag', 24.99, (SELECT id FROM public.categories WHERE name = 'Comfort'), 'inflatable-bean-bag.jpg'),
  ('Quality Bean Bag', 44.99, (SELECT id FROM public.categories WHERE name = 'Comfort'), 'quality-bean-bag.jpg'),
  ('Camping Chair', 24.99, (SELECT id FROM public.categories WHERE name = 'Comfort'), 'camping-chair.jpg'),
  
  -- Sports
  ('Basketball Hoop', 14.99, (SELECT id FROM public.categories WHERE name = 'Sports'), 'basketball-hoop.jpg'),
  ('Soccer Goal', 24.99, (SELECT id FROM public.categories WHERE name = 'Sports'), 'soccer-goal.jpg');