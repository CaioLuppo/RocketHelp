// Aqui você importa alguns componentes

import { VStack, Heading, Icon } from 'native-base';


// Assets

import Logo from '../assets/logo_primary.svg';
import { Input } from '../components/input';
import { Envelope, Key} from 'phosphor-react-native';

// Funções ou componentes (Usar camelCase)

export function SignIn() {
    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            
            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input 
                placeholder="E-mail" 
                mb={4}
                InputLeftElement={ <Icon as={<Envelope />} /> }
            />
            <Input placeholder="Senha" />

        </VStack>
    )
}