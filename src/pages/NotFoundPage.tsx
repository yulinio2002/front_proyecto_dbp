export default function NotFoundPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl">404 - Page Not Found</h1>
      <button onClick={() => history.back()} className="underline text-blue-600">Back</button>
    </div>
  );
}
