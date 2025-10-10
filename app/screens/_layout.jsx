import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
       <Stack.Screen 
      name="HazardMap" 
      options = {{headerShown: false , title: 'Hazard'}}
      />

      <Stack.Screen 
      name="settings" 
      options = {{headerShown: false , title: 'Settings'}}
      />

      <Stack.Screen 
      name="[id]" 
      options = {{headerShown: false}}
      />

    </Stack>
  )
}

export default _layout