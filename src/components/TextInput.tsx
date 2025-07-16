import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Wand2, Sparkles } from "lucide-react";

interface TextInputProps {
  onGenerate: (text: string) => void;
  isGenerating: boolean;
}

const TextInput = ({ onGenerate, isGenerating }: TextInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isGenerating) {
      onGenerate(text.trim());
    }
  };

  const examples = [
    "A futuristic sports car with glowing neon accents",
    "A cozy wooden cabin in a snowy forest",
    "A steampunk airship with brass propellers",
    "A crystal castle floating in clouds",
  ];

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="text-input" className="text-sm font-medium text-foreground">
            Describe your 3D model
          </label>
          <Textarea
            id="text-input"
            placeholder="Enter a detailed description of what you want to create..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] resize-none bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
            disabled={isGenerating}
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Try these examples:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setText(example)}
                disabled={isGenerating}
                className="justify-start text-left h-auto p-3 bg-background/30 hover:bg-background/50 border-border/30 hover:border-primary/50 transition-colors"
              >
                <Sparkles className="w-3 h-3 mr-2 text-primary flex-shrink-0" />
                <span className="text-sm">{example}</span>
              </Button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={!text.trim() || isGenerating}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Generating 3D Model...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate 3D Model
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default TextInput;