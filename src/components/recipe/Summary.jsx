import styled from "styled-components";

export default function Summary({ summary }) {
  return (
    <Container>
      <div
        dangerouslySetInnerHTML={{
          __html: summary,
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  color: rgb(37, 74, 93);
  
  div {
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    line-height: 2;
  }
`;
