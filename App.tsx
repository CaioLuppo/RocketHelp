// native base
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto';

// tema
import { THEME } from './src/styles/theme'

// imports das telas
import { Register } from './src/screens/Register';
import { Loading } from './src/components/loading';


export default function App() {

  // Configuração da fonte
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});  // armazena um booleano dizendo se carregou ou não


  // Retorna as telas
  return ( 
    <NativeBaseProvider theme={THEME}>

      <StatusBar 
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />

      { fontsLoaded ? <Register /> : <Loading /> }
    
    </NativeBaseProvider>
  );
}
