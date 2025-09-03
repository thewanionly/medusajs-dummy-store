export const Hello = ({ txt }: { txt?: string }) => {
  if (!txt) return null;

  return (
    <div>
      <p data-testid="txt">{txt}</p>
    </div>
  );
};
