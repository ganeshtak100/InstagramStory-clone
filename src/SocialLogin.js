//import liraries
// import {
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
// } from 'react-native-fbsdk';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

// create a component
const SocialLogin = () => {
  const [userInfo, setUserInfo] = useState('');
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '964934656659-l7jp4pm027ofeov3gsfikni0q6rultsa.apps.googleusercontent.com',
      // offlineAccess: false,
      // hostedDomain: '',
      // forceConsentPrompt: true,
    });
  }, []);

  const signInViaGoogle = async () => {
    try {
      // await GoogleSignin.hasPlayServices({
      //   // Check if device has Google Play Services installed
      //   // Always resolves to true on iOS
      //   showPlayServicesUpdateDialog: true,
      // });
      const userinfo = await GoogleSignin.signIn();
      console.log('user sigiin info=', JSON.stringify(userinfo));
      964934656659 -
        l7jp4pm027ofeov3gsfikni0q6rultsa.apps.googleusercontent.com;
      setUserInfo(userinfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('error----', error.message);
      }
    }
  };

  const logoutFromGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };
  const fbLogin = resCallback => {
    // LoginManager.logOut();
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log('fb result=====', result);
        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          resCallback({message: 'Eamil is Required'});
        }
        if (result.isCancelled) {
          console.log('fb error');
        } else {
          const infoRequest = new GraphRequest(
            './me?fields=email,name,picture',
            null,
            resCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (error) {
        console.log('login faild error==', error);
      },
    );
  };

  const onFbLogin = async () => {
    try {
      await fbLogin(_responseInfoCallBack);
    } catch (e) {
      console.log('errorrrrr', e);
    }
  };
  const _responseInfoCallBack = async (error, result) => {
    if (error) {
      console.log('error top', error);
      return;
    } else {
      const userData = result;
      console.log('user data fb-', userData);
    }
  };

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  async function onAppleButtonPress() {
    // performs login request
    return appleAuth
      .performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })
      .then(appleAuthRequestResponse => {
        let {identityToken, email} = appleAuthRequestResponse;
        console.log(
          'applelogin details----',
          identityToken,
          '-- email--',
          email,
        );
      });
  }

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInViaGoogle}
        // disabled={isSigninInProgress}
      />
      <Text>SocialLogin</Text>
      <TouchableOpacity
        style={{
          height: 48,
          width: 192,
          backgroundColor: 'pink',
          paddingHorizontal: 8,
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!'),
          )
        }>
        <Text style={{textAlign: 'center', fontSize: 17}}>FaceBook Login</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          height: 48,
          width: 192,
          backgroundColor: 'pink',
          paddingHorizontal: 8,
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
        onPress={() => onAppleButtonPress()}>
        <Text style={{textAlign: 'center', fontSize: 17}}>Apple Login</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default SocialLogin;
