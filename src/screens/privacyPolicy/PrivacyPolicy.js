import { StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Block from "../../components/utilities/Block";
import { colors, perfectSize } from "../../styles/theme";
import Header from "../../components/Header";
import Text from "../../components/utilities/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getTabHeight } from "../helpers/auth";

export default function PrivacyPolicy() {
  const insets = useSafeAreaInsets();
  const [tabBar_Height, setTab_Height] = useState(0);
  const gettingTabBar = async () => {
    let tab_height = await getTabHeight();
    let totalCount = parseInt(tab_height);
    setTab_Height(totalCount);
  };
  useEffect(() => {
    gettingTabBar();
  }, []);
  return (
    <Block flex={1} color={colors.white}>
      <Header headerTitle={"Privacy Policy"} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + perfectSize(85),
        }}
        showsVerticalScrollIndicator={false}
      >
        <Block flex={1} margin={[perfectSize(10), perfectSize(10)]}>
          <Text
            size={perfectSize(14)}
            regular
            style={styles.marginTop}
            color={colors.black}
          >
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You. We use Your Personal data to provide and improve the
            Service. By using the Service, You agree to the collection and use
            of information in accordance with this Privacy Policy.{"\n\n"}
            Identiq Infotech ("us", "we", or "our") operates the
            https://www.identiqinfotech.com website (the "Service").
            {"\n\n"}
            This page informs you of our policies regarding the collection, use
            and disclosure of Personal Information when you use our Service.
            {"\n\n"}
            We will not use or share your information with anyone except as
            described in this Privacy Policy.
            {"\n\n"}
            We use your Personal Information for providing and improving the
            Service. By using the Service, you agree to the collection and use
            of information in accordance with this policy. Unless otherwise
            defined in this Privacy Policy, terms used in this Privacy Policy
            have the same meanings as in our Terms and Conditions, accessible at
            https://www.identiqinfotech.com
          </Text>
        </Block>

        <Block flex={false} margin={[perfectSize(10), perfectSize(10)]}>
          <Text
            size={perfectSize(18)}
            bold
            style={styles.marginTop}
            color={colors.black}
          >
            Cookies
          </Text>

          <Text
            size={perfectSize(14)}
            regular
            style={styles.marginTop}
            color={colors.black}
          >
            Cookies are files with small amount of data, which may include an
            anonymous unique identifier. Cookies are sent to your browser from a
            web site and stored on your computer's hard drive.
            {"\n\n"}
            Identiq Infotech websites specifically uses them to enhance user
            experiences by remembering preferences. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </Text>
        </Block>

        <Block flex={false} margin={[perfectSize(10), perfectSize(10)]}>
          <Text
            size={perfectSize(18)}
            bold
            style={styles.marginTop}
            color={colors.black}
          >
            Security
          </Text>

          <Text
            size={perfectSize(14)}
            regular
            style={styles.marginTop}
            color={colors.black}
          >
            The security of your Personal Information is important to us, but
            remember that no method of transmission over the Internet, or method
            of electronic storage is 100% secure.
            {"\n\n"}
            Additional security measures on Identiq Infotech websites are
            enabled by CloudFlare. These logs may include the browser name, the
            type of computer and technical information about the means of
            connection to the site, such as the operating system, the Internet
            service providers utilized and other similar information.
          </Text>
        </Block>

        <Block flex={false} margin={[perfectSize(10), perfectSize(10)]}>
          <Text
            size={perfectSize(18)}
            bold
            style={styles.marginTop}
            color={colors.black}
          >
            Traffic Analytics
          </Text>

          <Text
            size={perfectSize(14)}
            regular
            style={styles.marginTop}
            color={colors.black}
          >
            Traffic analysis and monitoring of Identiq Infotech websites is
            provided by Google Analytics. This information is used to direct
            resources, plan maintenance windows and improve usability. Google
            may use the data it collects to contextualize and personalize the
            ads of its own advertising network.
          </Text>
        </Block>

        <Block flex={false} margin={[perfectSize(10), perfectSize(10)]}>
          <Text
            size={perfectSize(18)}
            bold
            style={styles.marginTop}
            color={colors.black}
          >
            Advertising
          </Text>

          <Text
            size={perfectSize(14)}
            regular
            style={styles.marginTop}
            color={colors.black}
          >
            Please visit Google's Advertising Privacy & Terms
          </Text>
        </Block>

        <Block flex={false} margin={[perfectSize(10), perfectSize(10)]}>
          <Text
            size={perfectSize(18)}
            bold
            style={styles.marginTop}
            color={colors.black}
          >
            Changes To This Privacy Policy
          </Text>

          <Text
            size={perfectSize(14)}
            regular
            style={styles.marginTop}
            color={colors.black}
          >
            We may update our Privacy Policy from time to time. So please watch
            this page for updated privacy policies.{"\n\n"}
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </Text>
        </Block>

        <Block flex={false} margin={[perfectSize(10), perfectSize(10)]}>
          <Text
            size={perfectSize(18)}
            bold
            style={styles.marginTop}
            color={colors.black}
          >
            Contact Us
          </Text>

          <Text
            size={perfectSize(14)}
            regular
            style={styles.marginTop}
            color={colors.black}
          >
            If you have any questions about this Privacy Policy, please contact
            us.
          </Text>
        </Block>
      </ScrollView>
      {/* <Block flex={false} color={"yellow"} height={tabBar_Height / 2} /> */}
    </Block>
  );
}

const styles = StyleSheet.create({});
