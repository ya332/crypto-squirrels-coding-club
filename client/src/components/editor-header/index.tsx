import {useState} from "react";
import Chat from "../call/Chat";
import {ToastContainer, toast} from 'react-toastify'
import ThemeModeToggle from 'react-dark-mode-toggle'
import {H2, Button, Wrapper} from '../elements'
import {updateTaskCode} from '../../utils/api/task'
import {useTheme} from '../../store/themeContext'
import data from '../../utils/language-data'
import { useHistory } from "react-router-dom";
import {
  Bold,
  Container,
  Select,
  Footer,
  ActionWrapper,
  Foreground,
  ActiveUserAvatar,
  AvatarContainer,
} from './elements'

function EditorHeader({
  setTab,
  setLanguage,
  language,
  content,
  taskId,
  activeUsers,
}: Props) {
  const [theme, setTheme] = useTheme()
  const history = useHistory();
  const [displayChat, setDisplayChat] = useState(false);

  const handleThemeToggle = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  // Open Chat
  const openChat = () => {
    setDisplayChat(!displayChat);
  };
  
  
  const handleSave = async () => {
    toast.info('Saving...')
    await updateTaskCode({
      content: content,
      id: taskId,
      language,
    })
  }

  return (
    <Foreground>
      <Wrapper>
        <ToastContainer />
        <Container>
          <H2 onClick={() => history.push('/')}>HOME</H2>
          <H2 modifiers={['clickable']} onClick={() => setTab('EDITOR')}>
            <Bold>&#60;&#47;&#62;</Bold> CodeTernel
          </H2>
          <ActionWrapper>
            <Select value={language} onChange={e => setLanguage(e.target.value)}>
              {data.map(elem => (
                <option key={elem.value} value={elem.value}>
                  {elem.option}
                </option>
              ))}
            </Select>
            <ThemeModeToggle
              checked={theme === 'dark'}
              size={60}
              onChange={handleThemeToggle}
            />
          </ActionWrapper>
          <Footer>
            <Wrapper>
              <AvatarContainer>
                <div>
                  <Button onClick={handleSave} modifiers={['mr5']}>
                    Save
                  </Button>
                  <Button onClick={() => setTab('EDITOR')} modifiers={['mr5']}>
                    Go to Editor
                  </Button>
                  <Button onClick={() => setTab('RESULT')} modifiers={['mr5']}>
                    Execute Code
                  </Button>
                  <Button onClick={openChat} modifiers={['mr5']}>
                    Chat
                  </Button>
                </div>
                <AvatarContainer>
                  {activeUsers.map(user => (
                    <ActiveUserAvatar title={user.username} key={user.socketId}>
                      {user.username[0].toUpperCase()}
                    </ActiveUserAvatar>
                  ))}
                </AvatarContainer>
              </AvatarContainer>
            </Wrapper>
          </Footer>
          {displayChat && <Chat />}
        </Container>
     
      </Wrapper>
      
    </Foreground>
  )
}

interface Props {
  setTab: (arg: 'EDITOR' | 'RESULT') => void
  setLanguage: (arg: string) => void
  language: string
  content: string
  taskId: string
  activeUsers: any[]
}

export default EditorHeader
