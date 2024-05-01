import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const SignIn = () => {
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const submit = () => {
    
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center px-4 my-6">
            <Image
              source={images.logo}
              resizeMode='contain'
              className="w-[115px] h-[35px]" 
            />

            <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">
              Login to Aora
            </Text>

            <FormField
              title="Email"
              value ={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            
            <FormField
              title="Password"
              value ={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <CustomButton
              title="Sign In" 
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn