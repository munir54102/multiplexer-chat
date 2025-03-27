
import { useState } from "react";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface QAEntry {
  id: string;
  question: string;
  answer: string;
}

const QASection = () => {
  const { toast } = useToast();
  const [qaEntries, setQaEntries] = useState<QAEntry[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddEntry = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast({
        title: "Error",
        description: "Both question and answer are required.",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      // Update existing entry
      setQaEntries(
        qaEntries.map((entry) =>
          entry.id === editingId
            ? { ...entry, question: newQuestion, answer: newAnswer }
            : entry
        )
      );
      toast({
        title: "Entry updated",
        description: "Your Q&A entry has been updated successfully.",
      });
    } else {
      // Add new entry
      const newEntry: QAEntry = {
        id: Date.now().toString(),
        question: newQuestion,
        answer: newAnswer,
      };
      setQaEntries([...qaEntries, newEntry]);
      toast({
        title: "Entry added",
        description: "Your Q&A entry has been added successfully.",
      });
    }

    // Reset form
    setNewQuestion("");
    setNewAnswer("");
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEditEntry = (entry: QAEntry) => {
    setNewQuestion(entry.question);
    setNewAnswer(entry.answer);
    setEditingId(entry.id);
    setIsAdding(true);
  };

  const handleDeleteEntry = (id: string) => {
    setQaEntries(qaEntries.filter((entry) => entry.id !== id));
    toast({
      title: "Entry deleted",
      description: "Your Q&A entry has been deleted successfully.",
    });
  };

  const handleCancel = () => {
    setNewQuestion("");
    setNewAnswer("");
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Q&A</h3>
        {!isAdding && (
          <Button 
            onClick={() => setIsAdding(true)} 
            variant="outline" 
            size="sm" 
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Q&A
          </Button>
        )}
      </div>

      {isAdding ? (
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h4 className="font-medium mb-3">{editingId ? "Edit Q&A Entry" : "Add Q&A Entry"}</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Question</label>
              <Input
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Enter a frequently asked question"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Answer</label>
              <Textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Enter the answer to the question"
                rows={4}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddEntry}>
                {editingId ? "Update" : "Save"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {qaEntries.length > 0 ? (
        <div className="space-y-3">
          {qaEntries.map((entry) => (
            <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium">{entry.question}</h4>
                  <p className="text-gray-600 mt-1">{entry.answer}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditEntry(entry)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="p-1 text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg min-h-[200px] flex items-center justify-center">
          <p className="text-gray-500">No Q&A entries yet. Add your first Q&A pair to help your chatbot answer common questions.</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Tips for effective Q&A entries</h4>
        <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
          <li>Use clear, specific questions that users are likely to ask</li>
          <li>Keep answers concise but comprehensive</li>
          <li>Include keywords in both questions and answers</li>
          <li>Create multiple variations of common questions</li>
          <li>Update Q&A regularly based on user interactions</li>
        </ul>
      </div>
    </div>
  );
};

export default QASection;
