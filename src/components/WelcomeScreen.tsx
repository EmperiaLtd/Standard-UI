import { Box, Button, Image, Text } from '@chakra-ui/react';
import { WelcomeProps } from '../interfaces';
import React from 'react';

function WelcomeScreen({ welcomeData, active, close }: WelcomeProps) {
  const transition = 'all 0.2s ease-in-out';

  return (
    <Box
      zIndex="120000"
      opacity={active ? 1 : 0}
      visibility={active ? 'visible' : 'hidden'}
      transition={transition}
      position="fixed"
      top={0}
      right={0}
      left={0}
      bottom={0}
      margin="auto"
      background="linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%), rgba(184, 184, 184, 0.20)"
      borderRadius="12px"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      backdropFilter="blur(12px)"
      width={['90vw', '390px', '600px', '600px', '650px']}
      height={['370px', '370px', '400px', '400px', '450px']}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box
        width={['180px', '180px', '230px', '230px', '290px']}
        height={['45px', '45px', '50px', '50px', '60px']}
        display={
          welcomeData?.collectionImage?.displayOnUI || welcomeData?.collectionTitle?.displayOnUI ? 'flex' : 'none'
        }
        justifyContent={
          welcomeData?.collectionImage?.displayOnUI && welcomeData?.collectionTitle?.displayOnUI
            ? 'space-between'
            : 'center'
        }
        alignItems="center"
      >
        {welcomeData?.collectionImage?.displayOnUI && (
          <Image
            src={welcomeData?.collectionImage?.value}
            height={['45px', '45px', '50px', '50px', '60px']}
            width={['45px', '45px', '50px', '50px', '60px']}
            borderRadius="100"
          />
        )}
        {welcomeData?.collectionTitle?.displayOnUI && (
          <Text
            textTransform="uppercase"
            fontFamily="Montserrat-Medium"
            w={['125px', '125px', '170px', '170px', '220px']}
            fontSize={['16px', '16px', '20px', '20px', '25px']}
            lineHeight={['18px', '18px', '22px', '22px', '27px']}
            color="white"
            noOfLines={2}
          >
            {welcomeData?.collectionTitle.value}
          </Text>
        )}
      </Box>

      {welcomeData?.jumboTitle?.displayOnUI && (
        <Box
          height={['60px', '60px', '50px', '50px', '55px']}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          m={['30px 0px', '30px 0px', '35px 0px', '35px 0px', '40px 0px']}
        >
          <Text
            fontFamily="Montserrat-Bold"
            width="100%"
            fontSize={['23px', '23px', '35px', '35px', '40px']}
            lineHeight={['28px', '28px', '40px', '40px', '45px']}
            color="white"
            textAlign="center"
            noOfLines={1}
          >
            {welcomeData?.jumboTitle?.value}
          </Text>
        </Box>
      )}

      {welcomeData?.tagline?.displayOnUI && (
        <Box
          height={['60px', '60px', '50px', '50px', '55px']}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            fontFamily="Montserrat-Bold"
            width={['200px', '300px', '400px', '400px', '450px']}
            fontSize={['13px', '13px', '14px', '14px', '15px']}
            color="white"
            textAlign="center"
            noOfLines={[4, 4, 2, 2, 2]}
          >
            {welcomeData?.tagline?.value}
          </Text>
        </Box>
      )}

      {welcomeData?.enterCTA?.displayOnUI && (
        <Button
          width="150px"
          fontSize={['13px', '13px', '14px', '14px', '15px']}
          textTransform="uppercase"
          fontFamily="Montserrat"
          bg="rgba(0, 0, 0, 0.1)"
          _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
          border="1px solid rgba(255, 255, 255, 0.80)"
          boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
          backdropFilter="blur(12px)"
          color="white"
          onClick={close}
        >
          {welcomeData?.enterCTA?.value}
        </Button>
      )}
    </Box>
  );
}

export default WelcomeScreen;
