import { useState, useMemo } from "react";
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
import { useCategories } from "@/hooks/useCategories";
import { useItems } from "@/hooks/useItems";

// Import local item images as fallback
import ledStrip from "@/assets/items/led-strip.jpg";
import flowerLedNew from "@/assets/items/flower-led-new.jpg";
import skylightNew from "@/assets/items/skylight-new.jpg";
import jellyfishLight from "@/assets/items/jellyfish-light.jpg";
import artificialCandles from "@/assets/items/artificial-candles.jpg";
import poster from "@/assets/items/poster.jpg";
import footballWallArt from "@/assets/items/football-wall-art.jpg";
import worldMap from "@/assets/items/world-map.jpg";
import flagsNew from "@/assets/items/flags-new.jpg";
import vinylSet from "@/assets/items/vinyl-set.jpg";
import artificialFlowers from "@/assets/items/artificial-flowers.jpg";
import rugNew from "@/assets/items/rug-new.jpg";
import basketballHoopNew from "@/assets/items/basketball-hoop-new.jpg";
import soccerGoal from "@/assets/items/soccer-goal.jpg";
import footballDecor from "@/assets/items/football-decor.jpg";
import plushToy from "@/assets/items/plush-toy.jpg";
import bobaPlushNew from "@/assets/items/boba-plush-new.jpg";
import catPlushNew from "@/assets/items/cat-plush-new.jpg";
import pigPlushNew from "@/assets/items/pig-plush-new.jpg";
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

// Map image filenames to imported images
const localImages: Record<string, string> = {
  "led-strip.jpg": ledStrip,
  "flower-led.jpg": flowerLedNew,
  "skylight.jpg": skylightNew,
  "jellyfish-light.jpg": jellyfishLight,
  "artificial-candles.jpg": artificialCandles,
  "poster.jpg": poster,
  "football-wall-art.jpg": footballWallArt,
  "world-map.jpg": worldMap,
  "flags.jpg": flagsNew,
  "vinyl-set.jpg": vinylSet,
  "artificial-flowers.jpg": artificialFlowers,
  "rug.jpg": rugNew,
  "basketball-hoop.jpg": basketballHoopNew,
  "soccer-goal.jpg": soccerGoal,
  "football-decor.jpg": footballDecor,
  "plush-toy.jpg": plushToy,
  "boba-plush.jpg": bobaPlushNew,
  "cat-plush.jpg": catPlushNew,
  "pig-plush.jpg": pigPlushNew,
  "mouse-pad.jpg": mousePad,
  "rgb-mouse-pad.jpg": rgbMousePad,
  "clock.jpg": clock,
  "inflatable-bean-bag.jpg": inflatableBeanBag,
  "quality-bean-bag.jpg": qualityBeanBag,
  "camping-chair.jpg": campingChair,
  "shoe-rack.jpg": shoeRack,
};

export const PackageSelector = ({
  packageType,
  open,
  onOpenChange,
}: PackageSelectorProps) => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: allItems, isLoading: itemsLoading } = useItems();
  
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // Set initial category when categories load
  if (!selectedCategoryId && categories && categories.length > 0) {
    setSelectedCategoryId(categories[0].id);
  }

  const isDormPiece = packageType === "DORM PIECE";
  const totalItems = Object.values(selectedItems).reduce((sum, count) => sum + count, 0);
  
  const totalPrice = Object.entries(selectedItems).reduce((sum, [itemId, count]) => {
    const item = allItems?.find(i => i.id === itemId);
    return sum + (item?.price || 0) * count;
  }, 0);

  const getSelectedItemsList = () => {
    return Object.entries(selectedItems)
      .map(([itemId]) => {
        const item = allItems?.find(i => i.id === itemId);
        return item?.name || "";
      })
      .filter(Boolean)
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

  const incrementItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || 0;
      const currentTotal = Object.values(prev).reduce((sum, count) => sum + count, 0);
      if (isDormPiece && currentTotal >= 3) {
        return prev;
      }
      return { ...prev, [itemId]: current + 1 };
    });
  };

  const decrementItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  const toggleItem = (itemId: string, categoryId: string) => {
    if (!isDormPiece) {
      setSelectedItems((prev) => {
        const newState = { ...prev };
        // Remove any other selected item from this category
        const categoryItems = allItems?.filter(i => i.category_id === categoryId) || [];
        categoryItems.forEach(item => {
          if (item.id !== itemId && newState[item.id]) {
            delete newState[item.id];
          }
        });
        // Toggle current item
        if (prev[itemId]) {
          delete newState[itemId];
        } else {
          newState[itemId] = 1;
        }
        return newState;
      });
    }
  };

  const isItemSelected = (itemId: string) => {
    return (selectedItems[itemId] || 0) > 0;
  };

  const isCategoryHasSelection = (categoryId: string) => {
    const categoryItems = allItems?.filter(i => i.category_id === categoryId) || [];
    return categoryItems.some(item => selectedItems[item.id]);
  };

  const shouldGrayOut = (itemId: string, categoryId: string) => {
    if (isDormPiece) return false;
    return isCategoryHasSelection(categoryId) && !isItemSelected(itemId);
  };

  const getItemQuantity = (itemId: string) => {
    return selectedItems[itemId] || 0;
  };

  const getFilteredItems = () => {
    if (!allItems) return [];
    
    if (!searchTerm.trim()) {
      return allItems.filter(item => item.category_id === selectedCategoryId);
    }
    
    const searchLower = searchTerm.toLowerCase();
    return allItems.filter(item => 
      item.name.toLowerCase().includes(searchLower)
    );
  };

  const currentItems = getFilteredItems();
  
  const getItemImage = (imageUrl: string | null) => {
    if (!imageUrl) return "";
    // Check if it's a local image filename
    if (localImages[imageUrl]) {
      return localImages[imageUrl];
    }
    // Otherwise return the URL as-is (for uploaded images)
    return imageUrl;
  };

  if (categoriesLoading || itemsLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="p-8 text-center">Loading...</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden p-0">
        <div className="flex h-full">
          {/* Left Sidebar - Categories */}
          <div className="w-64 border-r bg-muted/20 h-[85vh] flex flex-col">
            <ScrollArea className="flex-1 p-4">
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
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategoryId === category.id ? "gold" : "ghost"}
                  className="w-full justify-start text-left h-auto py-3 px-3"
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  <span className="text-sm font-medium leading-tight">
                    {category.name}
                  </span>
                </Button>
              ))}
            </div>
            </ScrollArea>
          </div>

          {/* Main Content - Items */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 border-b space-y-4">
              <h3 className="font-semibold text-xl text-primary">
                {searchTerm ? "Search Results" : categories?.find(c => c.id === selectedCategoryId)?.name}
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

            <ScrollArea className="h-[calc(85vh-240px)] p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-4">
                {currentItems.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No items found matching "{searchTerm}"
                  </div>
                ) : (
                  currentItems.map((item) => {
                    const isSelected = isItemSelected(item.id);
                    const isGrayed = shouldGrayOut(item.id, item.category_id);
                    const quantity = getItemQuantity(item.id);
                    const cannotAdd = isDormPiece && totalItems >= 3 && !isSelected;

                    return (
                      <div
                        key={item.id}
                        className={`flex flex-col border rounded-lg overflow-hidden transition-all ${
                          isSelected
                            ? "border-[hsl(var(--gold))] shadow-lg"
                            : "border-border"
                        } ${isGrayed ? "opacity-40" : ""}`}
                      >
                        <div className="aspect-square relative bg-background">
                          <img
                            src={getItemImage(item.image_url)}
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
                            <p className="text-lg font-bold text-[hsl(var(--gold))] mt-1">
                              £{Number(item.price).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex justify-center gap-2">
                            {isDormPiece ? (
                              <>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-9 w-9"
                                  onClick={() => decrementItem(item.id)}
                                  disabled={quantity === 0}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-9 w-9"
                                  onClick={() => incrementItem(item.id)}
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
                                onClick={() => toggleItem(item.id, item.category_id)}
                                disabled={!isSelected && isCategoryHasSelection(item.category_id)}
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
