
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";

interface TextEntry {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const TextInputSection = () => {
  const { toast } = useToast();
  const [textEntries, setTextEntries] = useState<TextEntry[]>([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = () => {
    if (!currentContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text content.",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      // Update existing entry
      setTextEntries(entries =>
        entries.map(entry =>
          entry.id === editingId
            ? {
                ...entry,
                title: currentTitle.trim() || "Untitled",
                content: currentContent,
              }
            : entry
        )
      );
      
      toast({
        title: "Updated",
        description: "Text entry has been updated successfully.",
      });
    } else {
      // Create new entry
      const newEntry: TextEntry = {
        id: Date.now().toString(),
        title: currentTitle.trim() || "Untitled",
        content: currentContent,
        createdAt: new Date(),
      };
      
      setTextEntries([...textEntries, newEntry]);
      
      toast({
        title: "Saved",
        description: "Text has been added to your knowledge base.",
      });
    }

    // Reset form
    setCurrentTitle("");
    setCurrentContent("");
    setEditingId(null);
  };

  const handleEdit = (entry: TextEntry) => {
    setCurrentTitle(entry.title);
    setCurrentContent(entry.content);
    setEditingId(entry.id);
  };

  const handleDelete = (id: string) => {
    setTextEntries(entries => entries.filter(entry => entry.id !== id));
    
    toast({
      title: "Deleted",
      description: "Text entry has been removed from your knowledge base.",
    });
    
    if (editingId === id) {
      setCurrentTitle("");
      setCurrentContent("");
      setEditingId(null);
    }
  };

  const handleAddNew = () => {
    if (currentTitle || currentContent) {
      if (window.confirm("You have unsaved changes. Start a new entry?")) {
        setCurrentTitle("");
        setCurrentContent("");
        setEditingId(null);
      }
    } else {
      setCurrentTitle("");
      setCurrentContent("");
      setEditingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Text</h3>
        <Button 
          onClick={handleAddNew} 
          variant="outline" 
          size="sm"
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title (optional)</label>
          <Input
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            placeholder="Enter a title for this text"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <Textarea
            value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)}
            placeholder="Enter text that your AI assistant should know about..."
            rows={8}
            className="resize-y"
          />
        </div>
        
        <Button 
          onClick={handleSave}
          className="flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          {editingId ? "Update Entry" : "Save to Knowledge Base"}
        </Button>
      </div>
      
      {textEntries.length > 0 ? (
        <div>
          <h4 className="font-medium mb-3">Knowledge Base Entries ({textEntries.length})</h4>
          <div className="space-y-3">
            {textEntries.map(entry => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">{entry.title}</h5>
                    <p className="text-sm text-gray-500 mb-2">
                      Added {entry.createdAt.toLocaleDateString()} • {entry.content.length} characters
                    </p>
                    <p className="text-gray-700 line-clamp-2">{entry.content}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleEdit(entry)} 
                      variant="ghost" 
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button 
                      onClick={() => handleDelete(entry.id)} 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-6 border border-gray-200 rounded-lg">
          <p className="text-gray-500">No text entries yet. Add your first entry to begin building your knowledge base.</p>
        </div>
      )}
    </div>
  );
};

export default TextInputSection;
