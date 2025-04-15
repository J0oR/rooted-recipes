
function SummaryStyled({ summary }) {
  

  return (
    <div >
      <div
      dangerouslySetInnerHTML={{
        __html: summary,
      }}
    />
    </div>
  );
}

export default SummaryStyled;
