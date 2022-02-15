import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useState, useCallback } from "react";
import { styles } from '../scripts/constants.js';

function UnorderedList(props) {
  return (
    <Text style={{paddingLeft: 5}}>{'\t\u2022 '}{props.text}{`
    
    `}</Text>
  );
}

function PrivacyPolicyScreen() {
  return (
    <View style={{alignItems: 'center'}}>
      <ScrollView style={{height: '100%', width: '90%', textAlign: "center"}}>
        <Text style={{textAlign: "center"}}>{"Mobile App Privacy Policy"}</Text>
        <Text>

{`

Last modified: August 9, 2021

`}
        
<Text style={{textDecorationLine: 'underline'}}>Introduction</Text>

{`

County of Cook, Illinois, a body politic and corporate of the State of Illinois, by and through the Office of the Cook County Board President ("Cook County" or "We") respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes:

`}
<UnorderedList text = {`The types of information we may collect or that you may provide when you download, install, access, or use the Project Rainbow App (the "App").`} />
<UnorderedList text = {`Our practices for collecting, using, maintaining, protecting, and disclosing that information.`} />
{`

This policy applies only to information we collect in this App, and in email, text, and other electronic communications sent through or in connection with this App. This policy DOES NOT apply to information that:

`}
<UnorderedList text = {`We collect offline or on any other Cook County apps or websites, including websites you may access through this App.`} />
<UnorderedList text = {`You provide to or is collected by any third party (see Third-Party Information Collection).`} />
{`

Our websites and apps, and these other third parties, have their own privacy policies, which we encourage you to read before providing information on or through them. Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, do not download, register with, or use this App. By downloading, registering with, or using this App, you agree to this privacy policy. This policy may change from time to time (see Changes to Our Privacy Policy). Your continued use of this App after we revise this policy means you accept those changes, so please check the policy periodically for updates.

`}
<Text style={{textDecorationLine: 'underline'}}>
Children Under the Age of 16
</Text>
{`
  
The App is not intended for children under 16 years of age except under parental supervision, and we do not knowingly collect personal information from children under 16. If we learn we have collected or received personal information from a child under 16 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 16, please contact us at rainbow@cookcountyil.gov.

`}
<Text style={{textDecorationLine: 'underline'}}>
Information We Collect and How We Collect It
</Text>
{`

We collect information from and about users of our App:

`}
<UnorderedList text = {`Automatically when you use the App.`} />
{`

`}

<Text style={{fontStyle: 'italic'}}>
Information You Provide to Us
</Text>
{`
When you download, register with, or use this App, we may collect information about you but individually does not identify you such as information gathered for data analytics purposes, or information that you provide to us such as through email to rainbow@cookcountyil.gov.

This information includes:`}

<UnorderedList text = {`Information that you provide by filling in forms in the App. This includes information provided at the time of registering to use the App. We may also ask you for information when you report a problem with the App.`} />
<UnorderedList text = {`Records and copies of your correspondence (including email addresses and phone numbers), if you contact us.`} />
<UnorderedList text = {`Your search queries on the App.`} />
<Text style={{fontStyle: 'italic'}}>
Automatic Information Collection and Tracking
</Text>
{`
  
When you download, access, and use the App, it may use technology to automatically collect:

`}
<UnorderedList text = {`Usage Details. When you access and use the App, we may automatically collect certain details of your access to and use of the App, including traffic data, location data, logs, and other communication data and the resources that you access and use on or through the App.`} />
<UnorderedList text = {`Device Information. We may collect information about your mobile device and internet connection, including the device's unique device identifier, IP address, operating system, browser type, mobile network information, and the device's telephone number.`} />
<UnorderedList text = {`Stored Information and Files. The App also may access metadata and other information associated with other files stored on your device.`} />
<UnorderedList text = {`Location Information. This App does not collect real-time information about the location of your device.`} />
{`

If you do not want us to collect this information do not download the App or delete it from your
device.

`}
<Text style={{fontStyle: 'italic'}}>
Information Collection and Tracking Technologies
</Text>
{`

The technologies we use for automatic information collection may include:

`}
<UnorderedList text = {`Cookies (or mobile cookies). A cookie is a small file placed on your smartphone or other mobile device. It may be possible to refuse to accept mobile cookies by activating the appropriate setting on your smartphone. However, if you select this setting you may be unable to access certain parts of our App.`} />
<UnorderedList text = {`Web Beacons. Pages of the App and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit Cook County, for example, to count users who have visited those pages and for other related app statistics (for example, recording the popularity of certain app content and verifying system and server integrity).`} />
<Text style={{fontStyle: 'italic'}}>
Third-Party Information Collection
</Text>
{`

When you use the App or its content, certain third parties may use automatic information collection technologies to collect information about you or your device. These third parties may include:

`}
<UnorderedList text = {`Advertisers, ad networks, and ad servers.`} />
<UnorderedList text = {`Analytics companies.`} />
<UnorderedList text = {`Your mobile device manufacturer.`} />
<UnorderedList text = {`Your mobile service provider.`} />
{`

These third parties may use tracking technologies to collect information about you when you use this app. The information they collect may be associated with your personal information or they may collect information, including personal information, about your online activities over time and across different websites, apps, and other online services websites. They may use this information to provide you with interest-based (behavioral) advertising or other targeted content. We do not control these third parties' tracking technologies or how they may be used. If you have any questions about an advertisement or other targeted content, you should contact the responsible provider directly.

`}
<Text style={{textDecorationLine: 'underline'}}>
How We Use Your Information
</Text>
{`

We use information that we collect about you or that you provide to us, including any personal
information, to:

`}
<UnorderedList text = {`Provide you with the App and its contents.`} />
<UnorderedList text = {`Fulfill any other purpose for which you provide it.`} />
{`

The usage information we collect helps us to improve our App and to deliver a better and more personalized experience by enabling us to:

`}
<UnorderedList text = {`Estimate our audience size and usage patterns.`} />
<UnorderedList text = {`Store information about your preferences, allowing us to customize our App according to your individual interests.`} />
<UnorderedList text = {`Speed up your searches.`} />
<UnorderedList text = {`Recognize you when you use the App.`} />
{`

For more information, see Your Choices About Our Collection, Use, and Disclosure of Your Information.

`}
<Text style={{textDecorationLine: 'underline'}}>
Disclosure of Your Information
</Text>
{`

We may disclose aggregated information about our users, and information that does not identify any individual or device, without restriction.

In addition, we may disclose personal information that we collect or you provide:

`}
<UnorderedList text = {`To contractors, service providers, and other third parties we use to support our website and app.`} />
<UnorderedList text = {`To fulfill the purpose for which you provide it. For example, if you gave us an email address to use an "email a friend" feature on our Website or App, we would transmit the contents of that email and your email address to the recipients.`} />
<UnorderedList text = {`For any other purpose disclosed by us when you provide the information.`} />
<UnorderedList text = {`With your consent.`} />
<UnorderedList text = {`To comply with any court order, law, or legal process, including to respond to any government or regulatory request.`} />
<UnorderedList text = {`To enforce our rights arising from any contracts entered into between you and us, including the App EULA, and for billing and collection.`} />
<UnorderedList text = {`If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of Cook County, or others.`} />
{`

`}
<Text style={{textDecorationLine: 'underline'}}>
Your Choices About Our Collection, Use, and Disclosure of Your Information
</Text>
{`

We strive to provide you with choices regarding the personal information you provide to us. This section describes mechanisms we provide for you to control certain uses and disclosures of your information.

`}
<UnorderedList text = {`Tracking Technologies. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. If you disable or refuse cookies or block the use of other tracking technologies, some parts of the App may then be inaccessible or not function properly.`} />
{`

We do not control third parties' collection or use of your information to serve interest-based advertising. However, these third parties may provide you with ways to choose not to have your information collected or used in this way. You can opt out of receiving targeted ads from members of the Network Advertising Initiative ("NAI") on the NAI's website.

`}
<Text style={{textDecorationLine: 'underline'}}>
Accessing and Correcting Your Personal Information
</Text>
{`

You may also send us an email at rainbow@cookcountyil.gov to request access to, correct, or delete any personal information that you have provided to us. We may not accommodate a request to change information if we believe the change would violate any law or legal requirement or cause the information to be incorrect.

`}
<Text style={{textDecorationLine: 'underline'}}>
Data Security
</Text>
{`

We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our App, you are responsible for keeping this password confidential. We ask you not to share your password with anyone. Unfortunately, the transmission of information via the internet and mobile platforms is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted through our App. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures we provide.

`}
<Text style={{textDecorationLine: 'underline'}}>
Changes to Our Privacy Policy
</Text>
{`

We may update our privacy policy from time to time. If we make material changes to how we treat our users' personal information, we will post the new privacy policy on this page with a notice that the privacy policy has been updated. The date the privacy policy was last revised is identified at the top of the page.

`}
<Text style={{textDecorationLine: 'underline'}}>
Contact Information
</Text>
{`
  
To ask questions or comment about this privacy policy and our privacy practices, contact us at: rainbow@cookcountyil.gov.`}
        </Text>
      </ScrollView>
    </View>
  )
}

export default PrivacyPolicyScreen;
