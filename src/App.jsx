import { Layout, Typography } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './pages/ContactList';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            Contact Manager
          </Title>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 16 }}>
          <div
            style={{
              background: '#fff',
              padding: 24,
              minHeight: 280,
              borderRadius: 8,
            }}
          >
            <Routes>
              <Route path="/" element={<ContactList />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Contact Manager ©{new Date().getFullYear()} Created with Ant Design
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
