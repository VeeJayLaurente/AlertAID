import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>

       <Stack.Screen 
      name="HazardMap" 
      options = {{headerShown: false}}
      />

      <Stack.Screen 
      name="settings" 
      options = {{headerShown: false}}
      />

    </Stack>
  )
}

export default _layout