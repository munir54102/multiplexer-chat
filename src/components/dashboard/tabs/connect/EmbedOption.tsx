
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmbedOptionProps {
  id: string;
  title: string;
  description: string;
  recommended: boolean;
  checked: boolean;
  codeSnippet: string;
  codeLabel: string;
}

const EmbedOption = ({
  id,
  title,
  description,
  recommended,
  checked,
  codeSnippet,
  codeLabel,
}: EmbedOptionProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    
    toast({
      title: "Copied!",
      description: "Code snippet copied to clipboard",
    });
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start mb-3">
        <input 
          type="radio" 
          checked={checked} 
          id={id} 
          className="mt-1 mr-2" 
          onChange={() => {}} // Add empty handler to avoid React warnings
        />
        <div>
          <label htmlFor={id} className="font-medium block mb-1">
            {title}
          </label>
          {recommended && (
            <div className="text-xs bg-blue-100 text-blue-800 rounded px-1.5 py-0.5 inline-block mb-2">
              Recommended
            </div>
          )}
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <div className="border border-dashed border-gray-200 rounded-lg p-3 bg-gray-50 mt-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{codeLabel}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 w-7 p-0" 
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto cursor-pointer" onClick={handleCopy}>
          {codeSnippet}
        </pre>
        <p className="text-xs text-gray-500 mt-2">Click the code or the copy button to copy to clipboard</p>
      </div>
    </div>
  );
};

export default EmbedOption;
