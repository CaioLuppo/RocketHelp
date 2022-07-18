import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

// Deixa título flexivel + propriedades
type Props = IButtonProps & {
    title: string;
}

export function Button({ title, ...rest } : Props) {
  return (
    <ButtonNativeBase 
        bg="green.700"
        h={14}
        rounded="sm"

        _pressed={{bg: 'green.500'}}

    {...rest} >
        <Heading
            color="white"
            fontSize="sm"
        >
            { title }
        </Heading>
    </ButtonNativeBase>
  );
}