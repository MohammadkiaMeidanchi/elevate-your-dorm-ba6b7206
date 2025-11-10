import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategories } from "@/hooks/useCategories";
import { useItems } from "@/hooks/useItems";
import { Package, Layers, DollarSign, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export const DashboardOverview = () => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: items, isLoading: itemsLoading } = useItems();

  if (categoriesLoading || itemsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const totalItems = items?.length || 0;
  const totalCategories = categories?.length || 0;
  const totalValue = items?.reduce((sum, item) => sum + Number(item.price), 0) || 0;

  // Calculate items by category for pie chart
  const itemsByCategory = categories?.map(category => ({
    name: category.name,
    value: items?.filter(item => item.category_id === category.id).length || 0,
  })).filter(item => item.value > 0) || [];

  // Calculate price ranges for bar chart
  const priceRanges = [
    { range: "$0-$25", min: 0, max: 25, count: 0 },
    { range: "$25-$50", min: 25, max: 50, count: 0 },
    { range: "$50-$100", min: 50, max: 100, count: 0 },
    { range: "$100+", min: 100, max: Infinity, count: 0 },
  ];

  items?.forEach(item => {
    const price = Number(item.price);
    const range = priceRanges.find(r => price >= r.min && price < r.max);
    if (range) range.count++;
  });

  const chartPriceRanges = priceRanges.filter(r => r.count > 0);

  // Get recent items (last 5)
  const recentItems = items?.slice(-5).reverse() || [];

  // Get most expensive items
  const expensiveItems = [...(items || [])].sort((a, b) => Number(b.price) - Number(a.price)).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Active categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Inventory value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalItems > 0 ? (totalValue / totalItems).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Per item average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {itemsByCategory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Items by Category</CardTitle>
              <CardDescription>Distribution of items across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={itemsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {itemsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {chartPriceRanges.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Price Distribution</CardTitle>
              <CardDescription>Number of items in each price range</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartPriceRanges}>
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="hsl(var(--primary))" name="Items" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Most Expensive Items</CardTitle>
            <CardDescription>Top 3 highest priced items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expensiveItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                    )}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-primary">${Number(item.price).toFixed(2)}</span>
                </div>
              ))}
              {expensiveItems.length === 0 && (
                <p className="text-sm text-muted-foreground">No items yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Added Items</CardTitle>
            <CardDescription>Last 5 items added to inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                    )}
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-primary">${Number(item.price).toFixed(2)}</span>
                </div>
              ))}
              {recentItems.length === 0 && (
                <p className="text-sm text-muted-foreground">No items yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
