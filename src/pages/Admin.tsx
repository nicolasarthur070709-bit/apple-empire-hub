import { useState, useRef } from "react";
import { getProducts, saveProducts, Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone, Trash2, Plus, Save, ArrowLeft, ImagePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [products, setProducts] = useState<Product[]>(getProducts);
  const { toast } = useToast();

  const handleSave = () => {
    saveProducts(products);
    toast({ title: "Catálogo salvo!", description: "As alterações foram aplicadas com sucesso." });
  };

  const addProduct = () => {
    setProducts([...products, { id: Date.now().toString(), model: "", storage: "", image: "" }]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, field: keyof Product, value: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateProduct(id, "image", e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-dark-deep border-b border-foreground/10 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="h-6 w-6 text-gold" />
            <span className="text-lg font-bold text-primary-foreground">
              Império <span className="text-gold">Apple</span> — Admin
            </span>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <ArrowLeft className="h-4 w-4 mr-1" /> Voltar ao site
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">Gerenciar Catálogo</h1>
          <div className="flex gap-3">
            <Button onClick={addProduct} variant="outline" className="border-gold/30 text-gold hover:bg-gold/10">
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
            <Button onClick={handleSave} className="bg-gold text-dark-deep hover:bg-gold-light font-semibold">
              <Save className="h-4 w-4 mr-1" /> Salvar
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {products.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              onUpdate={updateProduct}
              onRemove={removeProduct}
              onImageUpload={handleImageUpload}
            />
          ))}
          {products.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              Nenhum produto. Clique em "Adicionar" para começar.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ProductRow({
  product,
  onUpdate,
  onRemove,
  onImageUpload,
}: {
  product: Product;
  onUpdate: (id: string, field: keyof Product, value: string) => void;
  onRemove: (id: string) => void;
  onImageUpload: (id: string, file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-xl bg-card border border-border">
      {/* Image */}
      <div
        onClick={() => fileRef.current?.click()}
        className="w-24 h-24 rounded-lg bg-muted border border-border flex items-center justify-center cursor-pointer hover:border-gold/40 transition-colors overflow-hidden flex-shrink-0"
      >
        {product.image ? (
          <img src={product.image} alt={product.model} className="w-full h-full object-cover" />
        ) : (
          <ImagePlus className="h-8 w-8 text-muted-foreground/40" />
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImageUpload(product.id, file);
          }}
        />
      </div>

      {/* Fields */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Nome do modelo</label>
          <Input
            value={product.model}
            onChange={(e) => onUpdate(product.id, "model", e.target.value)}
            placeholder="Ex: iPhone 16 Pro Max"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Armazenamento</label>
          <Input
            value={product.storage}
            onChange={(e) => onUpdate(product.id, "storage", e.target.value)}
            placeholder="Ex: 256GB"
          />
        </div>
      </div>

      {/* Delete */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(product.id)}
        className="text-destructive hover:bg-destructive/10 flex-shrink-0"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
