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
  background-color: #FBF5EC;
  border-radius: 15px;
  padding: 50px;

  div{
    line-height: 2.5;
  }
`;
