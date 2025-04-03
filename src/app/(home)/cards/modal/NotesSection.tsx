export default function NotesSection({ notes }: { notes: string }) {
    if (!notes) return null;
  
    return (
      <div className="bg-gray-800 p-4 rounded-lg border-gray-700">
        <h4 className="text-lg font-semibold text-yellow-400">Notes</h4>
        <p className="text-sm text-gray-300 mt-2">{notes}</p>
      </div>
    );
  }