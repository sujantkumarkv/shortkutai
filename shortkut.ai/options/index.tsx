import {
  Button,
  Container,
  NativeSelect,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
  Group,
} from "@mantine/core"
import { useForm } from "@mantine/form"

import Dots from "~components/Dots"

import { supportedAPIKeys } from "../constants"

// for google login
// import { auth } from "~firebase/firebaseConfig"
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import firebase from "firebase/app";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(120),
    paddingBottom: rem(80),
    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(80),
      paddingBottom: rem(60)
    }
  },

  inner: {
    position: "relative",
    zIndex: 1
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  },

  dotsLeft: {
    left: 0,
    top: 0
  },

  title: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left"
    }
  },

  highlight: {
    fontSize: rem(60),
    fontWeight: 800,
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      textAlign: "left",
      fontSize: theme.fontSizes.md
    }
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    alignItems: "center",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column"
    }
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md
    },

    [theme.fn.smallerThan("xs")]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0
      }
    }
  }
}))

function CurrencyInput({ form }: any) {
  const select = (
    <NativeSelect
      data={supportedAPIKeys}
      radius="50px"
      name="api_key_type"
      size="lg"
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: rem(200)
        }
      }}
      {...form.getInputProps("api_key_type")}
    />
  )

  return (
    <TextInput
      type="password"
      placeholder="••••••••••••••••••••"
      w="550px"
      radius="50px"
      size="lg"
      styles={{
        root: {
          overflow: "hidden"
        }
      }}
      rightSection={select}
      rightSectionWidth={200}
      name="api_key"
      required
      autoComplete
      {...form.getInputProps("api_key")}
    />
  )
}

export function authHandler() {
  // tell background service worker to create a new tab and start listening to tab URL changes to parse query string param
  chrome.runtime.sendMessage({
    action: "handleAuth",
    url: "https://shortkut.ai/authentication/getstarted"
  });
}

export function WelcomePage() {
  const { classes } = useStyles()
  const form = useForm({
    initialValues: {
      api_key_type: "openai_api_key",
      api_key: ""
    }
  })



  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Unlock peak productivity with
          <Text className={classes.highlight} inherit>
            Shortkut AI
          </Text>{" "}
        </Title>

        <Container p={0} size={700}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Shortkut AI revolutionizes your workflow by harnessing the power of
            artificial intelligence. With its smart shortcuts and
            efficiency-boosting features, it's your secret weapon for maximizing
            productivity and achieving more in less time.
          </Text>
        </Container>

        {/* <form
          className={classes.controls}
          onSubmit={form.onSubmit((values) => {
            chrome.runtime.sendMessage(
              {
                message: "setAPIKey",
                data: {
                  [values.api_key_type]: values.api_key
                }
              },
              (res) => {
                console.debug(res)
                form.reset()
              }
            )
          })}>
          <CurrencyInput form={form} />
          <Button type="submit" className={classes.control} size="lg">
            {"⚡"} &nbsp;Save It
          </Button>
        </form> */}
        
        <Group position="center" py={rem(2)}>
            <Button type="submit" className={classes.control} size="md" onClick={authHandler} >
              &nbsp;Get started for free
            </Button>
        </Group>

      </div>
    </Container>
  )
}

export default function App() {
  return <WelcomePage />
}
