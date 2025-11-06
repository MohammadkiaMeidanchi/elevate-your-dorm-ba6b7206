import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface PackageSelectorProps {
  packageType: "DORM PIECE" | "DORM DROP";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = {
  "ROOM LIGHTING & AMBIENCE": [
    { name: "LED Strip (30m)", price: 21 },
    { name: "Flower LED", price: 13.5 },
    { name: "Skylight", price: 12.5 },
    { name: "Jellyfish Light", price: 17 },
    { name: "Artificial Candles", price: 15 },
  ],
  "WALL & DECOR": [
    { name: "Poster", price: 0, tbd: true },
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

  const isDormPiece = packageType === "DORM PIECE";
  const totalItems = Object.values(selectedItems).reduce((sum, count) => sum + count, 0);
  const totalPrice = Object.entries(selectedItems).reduce((sum, [item, count]) => {
    const [categoryName, itemName] = item.split("|||");
    const category = categories[categoryName as keyof typeof categories];
    const itemData = category.find((i) => i.name === itemName);
    return sum + (itemData?.price || 0) * count;
  }, 0);

  const toggleItem = (category: string, itemName: string) => {
    const key = `${category}|||${itemName}`;
    
    if (isDormPiece) {
      // DORM PIECE: can select up to 3 items total
      setSelectedItems((prev) => {
        const current = prev[key] || 0;
        if (current > 0) {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        } else {
          return { ...prev, [key]: 1 };
        }
      });
    } else {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-primary">
            {packageType} - Select Items
          </DialogTitle>
          {isDormPiece && (
            <p className="text-sm text-foreground/60">
              Choose up to 3 items individually
            </p>
          )}
          {!isDormPiece && (
            <p className="text-sm text-foreground/60">
              Choose 1 item or none from each category
            </p>
          )}
        </DialogHeader>

        <div className="space-y-6 py-4">
          {Object.entries(categories).map(([categoryName, items]) => (
            <div key={categoryName}>
              <h3 className="font-semibold text-lg mb-3 text-primary">
                {categoryName}
              </h3>
              <div className="grid gap-2">
                {items.map((item) => {
                  const key = `${categoryName}|||${item.name}`;
                  const isSelected = isItemSelected(categoryName, item.name);
                  const isGrayed = shouldGrayOut(categoryName, item.name);
                  
                  return (
                    <div
                      key={item.name}
                      className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                        isSelected
                          ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold)/0.05)]"
                          : "border-border"
                      } ${isGrayed ? "opacity-40" : ""}`}
                    >
                      <div className="flex-1">
                        <span className="text-sm font-medium">
                          {item.name}
                          {item.tbd && " (TBD)"}
                        </span>
                        {!item.tbd && (
                          <span className="text-sm text-foreground/60 ml-2">
                            £{item.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {isDormPiece ? (
                          <Button
                            size="sm"
                            variant={isSelected ? "gold" : "outline"}
                            onClick={() => toggleItem(categoryName, item.name)}
                            disabled={item.tbd}
                          >
                            {isSelected ? "Remove" : "Add"}
                          </Button>
                        ) : (
                          <>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => toggleItem(categoryName, item.name)}
                              disabled={item.tbd || (!isSelected && isCategoryHasSelection(categoryName))}
                            >
                              {isSelected ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 text-right space-y-1">
            <div className="text-2xl font-bold text-[hsl(var(--gold))]">
              Total: £{totalPrice.toFixed(2)}
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
            disabled={(isDormPiece && totalItems > 3) || totalItems === 0}
          >
            Proceed to Checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
