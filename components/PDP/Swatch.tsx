import { Box } from "@chakra-ui/react";

interface SwatchProps {
  active?: boolean;
  transition: string;
  colorName: string;
  available: boolean;
  onSizeClick: () => void;
}

function Swatch({
  active = false,
  transition,
  colorName,
  available,
  onSizeClick,
}: SwatchProps) {
  return (
    <Box
      flex={["0 0 auto", "0 0 auto", "0 0 auto", "0 0 auto", "0 0 auto"]}
      _notLast={{ marginRight: "10px" }}
      bg={colorName}
      border={
        active
          ? "1px solid rgba(255, 255, 255, 0.80)"
          : available
          ? `1px solid ${colorName}`
          : "1px solid rgba(255, 255, 255, 0.5)"
      }
      borderRadius="4px"
      boxShadow={active ? "0px 2px 4px 0px rgba(0, 0, 0, 0.25)" : "unset"}
      _hover={{
        boxShadow: available ? "0px 2px 4px 0px rgba(0, 0, 0, 0.25)" : "unset",
        border: available
          ? "1px solid rgba(255, 255, 255, 0.80)"
          : "1px solid rgba(255, 255, 255, 0.5)",
      }}
      width={["30px", "30px", "30px", "40px"]}
      height={["30px", "30px", "30px", "40px"]}
      position="relative"
      overflow="hidden"
      onClick={available && onSizeClick}
      cursor={available ? "pointer" : "unset"}
      transition={transition}
    >
      {!available && (
        <Box
          top="0"
          left="0"
          position="absolute"
          bg="rgba(255, 255, 255, 0.5)"
          width="100%"
          height="100%"
        />
      )}

      {!available && (
        <Box
          width={[
            "calc(1.414 * 30px)",
            "calc(1.414 * 30px)",
            "calc(1.414 * 30px)",
            "calc(1.414 * 40px)",
          ]}
          transform="rotate(-45deg)"
          transformOrigin="top right"
          borderTop="1px solid rgb(255, 255, 255)"
          position="absolute"
          top="-2px"
          right="-1px"
          boxSizing="border-box"
        ></Box>
      )}
    </Box>
  );
}

export default Swatch;
