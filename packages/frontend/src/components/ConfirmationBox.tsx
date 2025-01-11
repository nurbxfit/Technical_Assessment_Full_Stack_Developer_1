type ConfirmationBoxProps = {
  title: string;
  subtitle: string;
  onCancel: () => any;
  onConfirm: () => any;
};
export default function ConfirmationBox({
  title,
  subtitle,
  onCancel,
  onConfirm,
}: ConfirmationBoxProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-lg font-bold text-red-600 mb-4">{title}</h2>
      <p className="text-gray-700 text-sm mb-6 text-center">{subtitle}</p>
      <div className="flex gap-4 mt-4">
        {/* Cancel Button */}
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          onClick={onCancel}
          aria-label="Cancel deletion"
        >
          Cancel
        </button>

        {/* Confirm Button */}
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition-colors"
          onClick={onConfirm}
          aria-label="Confirm deletion"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
