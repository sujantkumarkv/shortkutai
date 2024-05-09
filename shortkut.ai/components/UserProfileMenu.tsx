import { Avatar, Button, Menu, Paper } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import {
  IconArrowsLeftRight,
  IconAt,
  IconTrash,
  IconUser
} from "@tabler/icons-react"
import { log } from "console"
import { useContext, useEffect, useState } from "react"

import { UserInfoContext } from "~contents"
import { signoutClearStorage } from "~contents/extensionAuth"
import { authHandler } from "~options"

const UserProfileMenu = () => {
  const userInfo = useContext(UserInfoContext)
  const [loggedIn, setLoggedIn] = useState(Object.keys(userInfo).length > 0)
  useEffect(() => {
    setLoggedIn(Object.keys(userInfo).length > 0)
  }, [userInfo])

  console.log("userInfo in UserProfileMenu: ", userInfo)
  let authCustomToken: string, email: string, uid: string
  if (loggedIn) {
    // alert(userInfo)
    authCustomToken = userInfo["authCustomToken"]
    email = userInfo["emailkey"]
    uid = userInfo["uidkey"]
    console.log("authCustomToken: ", authCustomToken)
    console.log("email: ", email)
    console.log("uid: ", uid)

    return (
      <>
        <Menu shadow="md" width={300}>
          <Menu.Target>
            <Button style={{ background: "transparent" }}>
              <Avatar radius="xl" />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Profile</Menu.Label>
            <Menu.Item icon={<IconAt size={14} />}>{email}</Menu.Item>
            <Menu.Item icon={<IconUser size={14} />}>{uid}</Menu.Item>
            <Menu.Item icon={<IconUser size={14} />}>Logged In</Menu.Item>
            <Menu.Divider />

            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              <Button
                variant="subtle"
                fullWidth
                onClick={() => {
                  notifications.show({
                    autoClose: 4000,
                    title: "Sure you wanna logout? please stay.",
                    message: (
                      <>
                        <Button
                          variant="subtle"
                          onClick={() => {
                            chrome.runtime.sendMessage(
                              { message: "signout" },
                              function (response) {
                                if (response.success) {
                                  console.log(
                                    "firebase tak signout is a success: " +
                                      response.message
                                  )

                                  // signed out, now clear storage
                                  chrome.runtime.sendMessage(
                                    { message: "signoutClearStorage" },
                                    function (response) {
                                      if (response.success) {
                                        notifications.show({
                                          message: "Logged out successfully.",
                                          autoClose: 2000
                                        })
                                        setLoggedIn(false)
                                        console.log(
                                          "signoutClearStorage is a success: " +
                                            response.message
                                        )
                                      } else {
                                        console.log(
                                          "signoutClearStorage failed: " +
                                            response.message
                                        )
                                      }
                                    }
                                  )
                                } else {
                                  console.log("failed: " + response.message)
                                }
                              }
                            )
                          }}>
                          yess.
                        </Button>
                      </>
                    )
                  })
                }}>
                Logout
              </Button>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </>
    )
  } else {
    return (
      <>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button style={{ background: "transparent" }}>
              <Avatar radius="xl" />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconAt size={14} />}>Not Logged in !!!</Menu.Item>

            <Menu.Divider />

            <Menu.Item>
              <Paper
                >
                <Button variant="filled" fullWidth onClick={authHandler}>
                  Get started for free
                </Button>
              </Paper>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </>
    )
  }
}

export default UserProfileMenu
