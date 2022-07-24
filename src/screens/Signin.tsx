import { useState } from 'react';

// firebase
import auth from "@react-native-firebase/auth";

// Aqui você importa alguns componentes

import { VStack, Heading, Icon, useTheme, Alert } from 'native-base';
import { Input } from '../components/input';
import { Button } from '../components/button';

// Assets

import Logo from '../assets/logo_primary.svg';
import { Envelope, Key} from 'phosphor-react-native';

// Funções ou componentes (Usar camelCase)

export function SignIn() {

    // estados
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { colors } = useTheme();

    function HandleSignIn() {
        if(!email || !password){
            return <Alert>Insira e-mail e senha!</Alert>;
        }
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            
            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input 
                mb={4}
                placeholder="E-mail" 
                InputLeftElement={ <Icon as={<Envelope color={colors.gray[300]} />} ml={4} /> }

                onChangeText={setEmail}

            />

            <Input 
                mb={8}
                placeholder="Senha" 
                InputLeftElement={ <Icon as={<Key color={colors.gray[300]} />} ml={4} /> }
                secureTextEntry

                onChangeText={setPassword}

            />

            <Button title='Entrar' w='full' />

        </VStack>
    )
}