import React, { useRef } from 'react';
import { UploadIcon, PaperclipIcon, XIcon } from './Icons';

interface Step3DetailsProps {
    purposeOptions: string[];
    selectedPurpose: string;
    onPurposeChange: (purpose: string) => void;
    questions: string;
    onQuestionsChange: (questions: string) => void;
    uploadedFiles: File[];
    onFilesChange: (files: File[]) => void;
}

const Step3Details: React.FC<Step3DetailsProps> = ({
    purposeOptions,
    selectedPurpose,
    onPurposeChange,
    questions,
    onQuestionsChange,
    uploadedFiles,
    onFilesChange,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onFilesChange([...uploadedFiles, ...Array.from(event.target.files)]);
        }
    };

    const removeFile = (index: number) => {
        onFilesChange(uploadedFiles.filter((_, i) => i !== index));
    };

    const handleDropzoneKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            fileInputRef.current?.click();
        }
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-secondary">Appointment Details</h2>
            <p className="text-muted mt-2">Provide additional information about your consultation needs.</p>

            <div className="mt-6 bg-background p-6 rounded-xl border border-border space-y-6">
                <div>
                    <label htmlFor="purpose-select" className="block text-sm font-medium text-muted mb-2">Purpose of Consultation</label>
                    <select
                        id="purpose-select"
                        value={selectedPurpose}
                        onChange={(e) => onPurposeChange(e.target.value)}
                        className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors focus:bg-primary-light/30"
                    >
                        <option value="" disabled>Select a purpose</option>
                        {purposeOptions.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="questions" className="block text-sm font-medium text-muted mb-2">
                        Specific questions for the consultant (optional)
                    </label>
                    <textarea
                        id="questions"
                        rows={4}
                        value={questions}
                        onChange={(e) => onQuestionsChange(e.target.value)}
                        className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors focus:bg-primary-light/30"
                        placeholder="e.g., What are the requirements for a student visa?"
                    />
                </div>

                <div>
                    <label id="documents-label" className="block text-sm font-medium text-muted mb-2">Supporting documents (optional)</label>
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={handleDropzoneKeyDown}
                        tabIndex={0}
                        role="button"
                        aria-labelledby="documents-label"
                        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary-light/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <UploadIcon />
                        <p className="mt-2 text-sm text-muted">
                            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted">PDF, DOCX, PNG, or JPG (max. 5MB each)</p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                            aria-hidden="true"
                        />
                    </div>
                    {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <h3 className="sr-only">Uploaded files</h3>
                            <ul>
                            {uploadedFiles.map((file, index) => (
                                <li key={index} className="flex items-center justify-between p-2 bg-surface rounded-lg">
                                    <div className="flex items-center">
                                        <PaperclipIcon />
                                        <span className="ml-2 text-sm text-secondary truncate">{file.name}</span>
                                    </div>
                                    <button onClick={() => removeFile(index)} className="p-1 rounded-full hover:bg-red-100 text-muted hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500" aria-label={`Remove ${file.name}`}>
                                        <XIcon />
                                    </button>
                                </li>
                            ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Step3Details;