
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Upload, FileText, Check, X, Info } from "lucide-react";

interface OnboardingUploadProps {
  userData: any;
  updateUserData: (data: Partial<any>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OnboardingUpload({ userData, updateUserData, onNext, onBack }: OnboardingUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const simulateUpload = () => {
    if (files.length === 0) {
      // Skip upload if no files
      onNext();
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(files.map(f => f.name));
      
      // Update user data with file information
      updateUserData({
        uploadedStatements: files.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
          uploadedAt: new Date().toISOString(),
        }))
      });
      
      // Wait a moment to show success state before proceeding
      setTimeout(() => {
        onNext();
      }, 1000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Bank Statements</h1>
        <p className="text-muted-foreground">
          Upload your bank statements for AI spending pattern detection (optional)
        </p>
      </div>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">Drag & drop files here</h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse from your computer
          </p>
          <Input
            type="file"
            className="hidden"
            id="file-upload"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.csv,.xlsx,.xls"
          />
          <Button asChild>
            <label htmlFor="file-upload">Select Files</label>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground flex items-start">
          <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <p>
            Your data is securely processed and never shared with third parties. We support PDFs
            and CSV files from most major banks. This step is optional - you can skip it and
            manually add your spending data later.
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium">Selected files:</h3>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{file.name}</span>
                </div>
                {uploadSuccess.includes(file.name) ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <button 
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    disabled={uploading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={simulateUpload} 
          className="flex-1"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : files.length > 0 ? "Upload & Continue" : "Skip & Continue"} 
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
