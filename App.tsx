// native base
import { NativeBaseProvider } from 'native-base';

// tema
import { THEME } from './src/styles/theme'

// imports das telas
import { SignIn } from './src/screens/SignIn';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <SignIn />
    </NativeBaseProvider>
  );
}
