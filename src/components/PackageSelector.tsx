import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import all item images
import ledStrip from "@/assets/items/led-strip.jpg";
import flowerLed from "@/assets/items/flower-led.jpg";
import skylight from "@/assets/items/skylight.jpg";
import jellyfishLight from "@/assets/items/jellyfish-light.jpg";
import artificialCandles from "@/assets/items/artificial-candles.jpg";
import poster from "@/assets/items/poster.jpg";
import footballWallArt from "@/assets/items/football-wall-art.jpg";
import worldMap from "@/assets/items/world-map.jpg";
import flags from "@/assets/items/flags.jpg";
import vinylSet from "@/assets/items/vinyl-set.jpg";
import artificialFlowers from "@/assets/items/artificial-flowers.jpg";
import rug from "@/assets/items/rug.jpg";
import basketballHoop from "@/assets/items/basketball-hoop.jpg";
import soccerGoal from "@/assets/items/soccer-goal.jpg";
import footballDecor from "@/assets/items/football-decor.jpg";
import plushToy from "@/assets/items/plush-toy.jpg";
import bobaPlush from "@/assets/items/boba-plush.jpg";
import catPlush from "@/assets/items/cat-plush.jpg";
import pigPlush from "@/assets/items/pig-plush.jpg";
import mousePad from "@/assets/items/mouse-pad.jpg";
import rgbMousePad from "@/assets/items/rgb-mouse-pad.jpg";
import clock from "@/assets/items/clock.jpg";
import inflatableBeanBag from "@/assets/items/inflatable-bean-bag.jpg";
import qualityBeanBag from "@/assets/items/quality-bean-bag.jpg";
import campingChair from "@/assets/items/camping-chair.jpg";
import shoeRack from "@/assets/items/shoe-rack.jpg";

interface PackageSelectorProps {
  packageType: "DORM PIECE" | "DORM DROP";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const itemImages: Record<string, string> = {
  "LED Strip (30m)": ledStrip,
  "Flower LED": flowerLed,
  "Skylight": skylight,
  "Jellyfish Light": jellyfishLight,
  "Artificial Candles": artificialCandles,
  "Poster": poster,
  "Football Wall Art Print": footballWallArt,
  "World Map": worldMap,
  "Flags": flags,
  "Vinyl Set (8 pcs)": vinylSet,
  "Artificial Flowers": artificialFlowers,
  "Rug": rug,
  "Basketball Hoop": basketballHoop,
  "Soccer Goal Net": soccerGoal,
  "Random Football Decor": footballDecor,
  "Plush Toy": plushToy,
  "Boba Tea Plush": bobaPlush,
  "Cat Plush": catPlush,
  "Pig Plush": pigPlush,
  "Mouse Pad": mousePad,
  "RGB Mouse Pad": rgbMousePad,
  "Clock": clock,
  "Inflatable Bean Bag": inflatableBeanBag,
  "High-Quality Bean Bag": qualityBeanBag,
  "Camping Chair": campingChair,
  "Shoe Rack": shoeRack,
};

const categories = {
  "ROOM LIGHTING & AMBIENCE": [
    { name: "LED Strip (30m)", price: 21 },
    { name: "Flower LED", price: 13.5 },
    { name: "Skylight", price: 12.5 },
    { name: "Jellyfish Light", price: 17 },
    { name: "Artificial Candles", price: 15 },
  ],
  "WALL & DECOR": [
    { name: "Poster", price: 15 },
    { name: "Football Wall Art Print", price: 24 },
    { name: "World Map", price: 13 },
    { name: "Flags", price: 15 },
    { name: "Vinyl Set (8 pcs)", price: 20 },
    { name: "Artificial Flowers", price: 17 },
    { name: "Rug", price: 15 },
  ],
  "SPORT & FUN DECOR": [
    { name: "Basketball Hoop", price: 15 },
    { name: "Soccer Goal Net", price: 20 },
    { name: "Football Wall Art Print", price: 24 },
    { name: "Random Football Decor", price: 12 },
  ],
  "PLUSH & CUTE ITEMS": [
    { name: "Plush Toy", price: 9.2 },
    { name: "Boba Tea Plush", price: 9.5 },
    { name: "Cat Plush", price: 7 },
    { name: "Pig Plush", price: 11 },
  ],
  "DESK & TECH": [
    { name: "Mouse Pad", price: 6 },
    { name: "RGB Mouse Pad", price: 15 },
    { name: "Clock", price: 15 },
  ],
  "FURNITURE & COMFORT": [
    { name: "Inflatable Bean Bag", price: 15 },
    { name: "High-Quality Bean Bag", price: 50.99 },
    { name: "Camping Chair", price: 11.5 },
  ],
  "STORAGE & HOME": [
    { name: "Shoe Rack", price: 16 },
  ],
};

export const PackageSelector = ({
  packageType,
  open,
  onOpenChange,
}: PackageSelectorProps) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(categories)[0]
  );
  const [searchTerm, setSearchTerm] = useState("");

  const isDormPiece = packageType === "DORM PIECE";
  const totalItems = Object.values(selectedItems).reduce((sum, count) => sum + count, 0);
  const totalPrice = Object.entries(selectedItems).reduce((sum, [item, count]) => {
    const [categoryName, itemName] = item.split("|||");
    const category = categories[categoryName as keyof typeof categories];
    const itemData = category.find((i) => i.name === itemName);
    return sum + (itemData?.price || 0) * count;
  }, 0);

  const getSelectedItemsList = () => {
    return Object.entries(selectedItems)
      .map(([item]) => {
        const [, itemName] = item.split("|||");
        return itemName;
      })
      .join(", ");
  };

  const handleContactUs = () => {
    const items = getSelectedItemsList();
    const subject = encodeURIComponent(`${packageType} Package Inquiry`);
    const body = encodeURIComponent(
      `Hello,\n\nI would like to inquire about the ${packageType} package with the following items:\n\n${items}\n\nTotal: £${totalPrice.toFixed(2)}\n\nThank you!`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const incrementItem = (category: string, itemName: string) => {
    const key = `${category}|||${itemName}`;
    setSelectedItems((prev) => {
      const current = prev[key] || 0;
      return { ...prev, [key]: current + 1 };
    });
  };

  const decrementItem = (category: string, itemName: string) => {
    const key = `${category}|||${itemName}`;
    setSelectedItems((prev) => {
      const current = prev[key] || 0;
      if (current <= 1) {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      }
      return { ...prev, [key]: current - 1 };
    });
  };

  const toggleItem = (category: string, itemName: string) => {
    const key = `${category}|||${itemName}`;
    
    if (!isDormPiece) {
      // DORM DROP: one item per category
      setSelectedItems((prev) => {
        const newState = { ...prev };
        // Remove any other selected item from this category
        Object.keys(newState).forEach((k) => {
          if (k.startsWith(category + "|||")) {
            delete newState[k];
          }
        });
        // Toggle current item
        if (prev[key]) {
          return newState;
        } else {
          return { ...newState, [key]: 1 };
        }
      });
    }
  };

  const isItemSelected = (category: string, itemName: string) => {
    const key = `${category}|||${itemName}`;
    return (selectedItems[key] || 0) > 0;
  };

  const isCategoryHasSelection = (category: string) => {
    return Object.keys(selectedItems).some((k) => k.startsWith(category + "|||"));
  };

  const shouldGrayOut = (category: string, itemName: string) => {
    if (isDormPiece) return false;
    return isCategoryHasSelection(category) && !isItemSelected(category, itemName);
  };

  const getItemQuantity = (category: string, itemName: string) => {
    const key = `${category}|||${itemName}`;
    return selectedItems[key] || 0;
  };

  const getFilteredItems = (): Array<{ name: string; price: number; category?: string }> => {
    if (!searchTerm.trim()) {
      return categories[selectedCategory as keyof typeof categories];
    }
    
    const searchLower = searchTerm.toLowerCase();
    const allItems: Array<{ name: string; price: number; category: string }> = [];
    
    Object.entries(categories).forEach(([categoryName, items]) => {
      items.forEach((item) => {
        if (item.name.toLowerCase().includes(searchLower)) {
          allItems.push({ ...item, category: categoryName });
        }
      });
    });
    
    return allItems;
  };

  const currentItems = getFilteredItems();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden p-0">
        <div className="flex h-full">
          {/* Left Sidebar - Categories */}
          <ScrollArea className="w-64 border-r bg-muted/20 p-4 h-[85vh]">
            <DialogHeader className="px-2 pb-4">
              <DialogTitle className="text-xl font-display text-primary">
                {packageType}
              </DialogTitle>
              <p className="text-xs text-foreground/60 mt-1">
                {isDormPiece
                  ? "Choose up to 3 items individually"
                  : "Choose 1 item or none from each category"}
              </p>
            </DialogHeader>
            <div className="space-y-2 mt-4">
              {Object.keys(categories).map((categoryName) => (
                <Button
                  key={categoryName}
                  variant={selectedCategory === categoryName ? "gold" : "ghost"}
                  className="w-full justify-start text-left h-auto py-3 px-3"
                  onClick={() => setSelectedCategory(categoryName)}
                >
                  <span className="text-sm font-medium leading-tight">
                    {categoryName}
                  </span>
                </Button>
              ))}
            </div>
          </ScrollArea>

          {/* Main Content - Items */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b space-y-4">
              <h3 className="font-semibold text-xl text-primary">
                {searchTerm ? "Search Results" : selectedCategory}
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-4">
                {currentItems.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No items found matching "{searchTerm}"
                  </div>
                ) : (
                  currentItems.map((item) => {
                    const itemCategory = "category" in item ? item.category : selectedCategory;
                    const key = `${itemCategory}|||${item.name}`;
                    const isSelected = isItemSelected(itemCategory, item.name);
                    const isGrayed = shouldGrayOut(itemCategory, item.name);
                    const quantity = getItemQuantity(itemCategory, item.name);
                    const cannotAdd = isDormPiece && totalItems >= 3 && !isSelected;

                    return (
                      <div
                        key={key}
                        className={`flex flex-col border rounded-lg overflow-hidden transition-all ${
                          isSelected
                            ? "border-[hsl(var(--gold))] shadow-lg"
                            : "border-border"
                        } ${isGrayed ? "opacity-40" : ""}`}
                      >
                        <div className="aspect-square relative bg-background">
                          <img
                            src={itemImages[item.name]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {quantity > 0 && (
                            <div className="absolute top-2 right-2 bg-[hsl(var(--gold))] text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                              {quantity}
                            </div>
                          )}
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="text-center">
                            <p className="text-sm font-medium leading-tight">
                              {item.name}
                            </p>
                            {searchTerm && "category" in item && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.category}
                              </p>
                            )}
                            <p className="text-lg font-bold text-[hsl(var(--gold))] mt-1">
                              £{item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex justify-center gap-2">
                            {isDormPiece ? (
                              <>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-9 w-9"
                                  onClick={() => decrementItem(itemCategory, item.name)}
                                  disabled={quantity === 0}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-9 w-9"
                                  onClick={() => incrementItem(itemCategory, item.name)}
                                  disabled={cannotAdd}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-9 w-9"
                                onClick={() => toggleItem(itemCategory, item.name)}
                                disabled={!isSelected && isCategoryHasSelection(itemCategory)}
                              >
                                {isSelected ? (
                                  <Minus className="h-4 w-4" />
                                ) : (
                                  <Plus className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t p-6 bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-[hsl(var(--gold))]">
                    £{totalPrice.toFixed(2)}
                  </div>
                  {isDormPiece && totalItems > 3 && (
                    <p className="text-sm text-red-500 font-medium">
                      Maximum 3 items allowed for DORM PIECE
                    </p>
                  )}
                </div>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={handleContactUs}
                  disabled={(isDormPiece && totalItems > 3) || totalItems === 0}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
