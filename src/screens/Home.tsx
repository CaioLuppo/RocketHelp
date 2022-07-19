import { Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base';

import { SignOut } from 'phosphor-react-native';
import Logo from '../assets/logo_secondary.svg';

import { Filter } from '../components/filter';



export function Home() {

const { colors } = useTheme();

return (
    <VStack flex={1} pb={6} bg="gray.700">

        {/* Cabeçalho */}
        <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.600"
            pt={12}
            pb={5}
            px={6}
        >
            
            <Logo />

            <IconButton 
                icon = {<SignOut size={26} color={colors.gray[300]} />}
            />

        </HStack>

        {/* Meus chamados */}
        <VStack flex={1} px={6}>

            {/* Texto do heading */}
            <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">

                <Heading color="gray.100" >Meus chamados</Heading>

                <Text color="gray.200"> 3 </Text>
            </HStack>

            {/* Filtros */}
            <HStack>
                <Filter 
                    type='open'
                    title='Em andamento'
                />
                <Filter 
                    type='closed'
                    title='Encerrados'
                />
            </HStack>

        </VStack>

    </VStack>
  );
}