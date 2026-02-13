import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 80px auto;
  text-align: center;
  padding: 80px 48px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 2px solid #e74c3c;

  @media (max-width: 768px) {
    padding: 60px 24px;
    margin: 40px 24px;
  }
`;

const Icon = styled.div`
  font-size: 96px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 32px;
  color: #e74c3c;
  margin: 0 0 16px 0;
  font-weight: 800;
`;

const Message = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

const CodeBlock = styled.div`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 16px;
  margin: 24px 0;
  text-align: left;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #333;
`;

const RefreshButton = styled.button`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
  }
`;

const ErrorState = ({ onRetry }) => {
  return (
    <Container>
      <Icon>⚠️</Icon>
      <Title>სერვერთან დაკავშირება ვერ მოხერხდა</Title>
      <Message>
        JSON Server არ მუშაობს ან არ არის ხელმისაწვდომი. გთხოვთ დარწმუნდით რომ
        სერვერი გაშვებულია.
      </Message>

      <CodeBlock>
        cd craft-coffee-server
        <br />
        npm start
      </CodeBlock>

      <Message style={{ fontSize: '14px', color: '#999' }}>
        სერვერი უნდა მუშაობდეს პორტზე: http://localhost:3001
      </Message>

      {onRetry && (
        <RefreshButton onClick={onRetry}>🔄 ხელახალი ცდა</RefreshButton>
      )}
    </Container>
  );
};

export default ErrorState;
