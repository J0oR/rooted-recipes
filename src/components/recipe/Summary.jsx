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
width: 100%;
  background-color: #ECF0F1;
  border-radius: 15px;
  padding: 50px;
  color: rgb(37, 74, 93);
    font-size: 1rem;

  div{
    line-height: 2.5;
  }
`;
