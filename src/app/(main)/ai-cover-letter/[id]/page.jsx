const DynamicCoverLetter = async ({ params }) => {
  const { id } = await params;
  return <div>DynamicCoverLetter: {id}</div>;
};

export default DynamicCoverLetter;
