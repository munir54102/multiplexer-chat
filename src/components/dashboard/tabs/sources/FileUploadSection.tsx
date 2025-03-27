
import { useState } from "react";
import { UploadCloud, File, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

const FileUploadSection = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'text/plain'
    ];
    
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => allowedTypes.includes(file.type));
    
    if (validFiles.length !== fileArray.length) {
      toast({
        title: "Invalid file types",
        description: "Only PDF, DOC, DOCX, and TXT files are supported.",
        variant: "destructive",
      });
    }
    
    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        id: Date.now() + Math.random().toString(),
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Files uploaded",
        description: `${validFiles.length} file(s) uploaded successfully.`,
      });
    }
  };
  
  const removeFile = (id: string) => {
    setUploadedFiles(files => files.filter(file => file.id !== id));
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Files</h3>
      
      <div 
        className={`border ${isDragging ? 'border-primary border-dashed bg-primary/5' : 'border-gray-300 border-dashed'} rounded-lg p-10 text-center min-h-[300px] flex flex-col items-center justify-center transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadCloud className={`mb-4 ${isDragging ? 'text-primary' : 'text-gray-400'}`} size={40} />
        <p className="mb-2">Drag & drop files here, or click to select files</p>
        <p className="text-sm text-gray-500 mb-4">Supported File Types: .pdf, .doc, .docx, .txt</p>
        <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Select Files
          <input 
            type="file" 
            className="hidden" 
            multiple 
            accept=".pdf,.doc,.docx,.txt" 
            onChange={handleFileInput}
          />
        </label>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-3">Uploaded Files ({uploadedFiles.length})</h4>
          <div className="space-y-2">
            {uploadedFiles.map(file => (
              <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <File className="text-gray-500 mr-3" size={20} />
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h4 className="font-medium mb-2">Processing Status</h4>
        <p className="text-sm text-gray-600">
          Uploaded files will be processed to extract information that your AI assistant can use to answer questions. This may take a few minutes depending on the file size and complexity.
        </p>
      </div>
    </div>
  );
};

export default FileUploadSection;
