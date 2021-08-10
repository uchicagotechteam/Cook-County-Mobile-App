import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useState, useCallback } from "react";
import { styles } from '../scripts/constants.js';

function LicenseAgreementScreen() {
  return (
    <View style={{alignItems: 'center'}}>
      <ScrollView style={{height: '100%', width: '90%', textAlign: "center"}}>
        <Text>
        {`Mobile Application End User License Agreement

          This Mobile Application End User License Agreement ("Agreement") is a binding agreement between you ("End User" or "you") and the County of Cook, Illinois, a body politic and corporate of the State of Illinois, by and through the Office of the Cook County Board President ("Cook County"). This Agreement governs your use of the Project Rainbow App on the GOOGLE PLAY STORE, (including all related documentation, the "Application"). The Application is licensed, not sold, to you.

          BY CLICKING THE "AGREE" BUTTON BELOW OR DOWNLOADING/ INSTALLING/ USING THE APPLICATION, YOU (A) ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTAND THIS AGREEMENT; (B) REPRESENT THAT YOU ARE 18 YEARS OF AGE OR OLDER; AND (C) ACCEPT THIS AGREEMENT AND AGREE THAT YOU ARE LEGALLY BOUND BY ITS TERMS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT DOWNLOAD/ INSTALL/USE THE APPLICATION AND DELETE IT FROM YOUR MOBILE DEVICE IF ALREADY DOWNLOADED.


          1. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"License Grant"}</Text>
        <Text>
        {`. Subject to the terms of this Agreement, Cook County grants you a limited, non-exclusive, and nontransferable license to:
          (a) download, install, and use the Application for your personal, non-commercial use on a single Android Device owned or otherwise controlled by you ("Mobile Device") strictly in accordance with the Application's documentation; and

          (b) access, stream, download, and use on such Mobile Device the Content and Services (as defined in Section 5 made available in or otherwise accessible through the Application, strictly in accordance with this Agreement and the Terms of Use applicable to such Content and Services as set forth in Section 5.


          2. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"License Restrictions"}</Text>
        <Text>
        {`. You shall not:

          (a) copy the Application, except as expressly permitted by this license;

          (b) modify, translate, adapt, or otherwise create derivative works or improvements, whether or not patentable, of the Application;

          (c) reverse engineer, disassemble, decompile, decode, or otherwise attempt to derive or gain access to the source code of the Application or any part thereof;

          (d) remove, delete, alter, or obscure any trademarks or any copyright, trademark, patent, or other intellectual property or proprietary rights notices from the Application, including any copy thereof;

          (e) rent, lease, lend, sell, sublicense, assign, distribute, publish, transfer, or otherwise make available the Application, or any features or functionality of the Application, to any third party for any reason, including by making the Application available on a network where it is capable of being accessed by more than one device at any time; or

          (f) remove, disable, circumvent, or otherwise create or implement any workaround to any copy protection, rights management, or security features in or protecting the Application; or

          (g) use the Application in, or in association with, the design, construction, maintenance, or operation of any hazardous environments or systems, including any power generation systems; aircraft navigation or communication systems, air traffic control systems, or any other transport management systems; safety-critical applications, including medical or life-support systems, vehicle operation applications or any police, fire, or other safety response systems; and military or aerospace applications, weapons systems, or environments.


          3. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Reservation of Rights"}</Text>
        <Text>
        {`. You acknowledge and agree that the Application is provided under license, and not sold, to you. You do not acquire any ownership interest in the Application under this Agreement, or any other rights thereto other than to use the Application in accordance with the license granted, and subject to all terms, conditions, and restrictions, under this Agreement. Cook County and its licensors and service providers reserve and shall retain their entire right, title, and interest in and to the Application, including all copyrights, trademarks, and other intellectual property rights therein or relating thereto, except as expressly granted to you in this Agreement.


        4. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Collection and Use of Your Information"}</Text>
        <Text>
        {`. You acknowledge that when you download, install, or use the Application, Cook County may use automatic means (including, for example, cookies and web beacons) to collect information about your Mobile Device and about your use of the Application. You also may be required to provide certain information about yourself as a condition to downloading, installing, or using the Application or certain of its features or functionality. All information we collect through or in connection with this Application is subject to our Privacy Policy [INSERT AS LINK TO MOBILE APP PRIVACY POLICY]. By downloading, installing, using, and providing information to or through this Application, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy.


        5. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Content and Services"}</Text>
        <Text>
        {`. The Application may provide you with access to Cook County's website located at www.projectrainbow.cookcountyil.gov (the "Website") and products and services accessible thereon, and certain features, functionality, and content accessible on or through the Application may be hosted on the Website (collectively, "Content and Services"). Your access to and use of such Content and Services are governed by Website's Terms of Use and Privacy Policy located at [TERMS OF USE LINK] and [PRIVACY POLICY LINK], which are incorporated herein by this reference. Your access to and use of such Content and Services may require you to acknowledge your acceptance of such Terms of Use and Privacy Policy and/or to register with the Website, and your failure to do so may restrict you from accessing or using certain of the Application's features and functionality. Any violation of such Terms of Use will also be deemed a violation of this Agreement.


        6. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Geographic Restrictions"}</Text>
        <Text>
        {`. The Content and Services are based in the State of Illinois in the United States and provided for access and use only by persons located in the United States. You acknowledge that you may not be able to access all or some of the Content and Services outside of the United States and that access thereto may not be legal by certain persons or in certain countries. If you access the Content and Services from outside the United States, you are responsible for compliance with local laws.


        7. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Updates"}</Text>
        <Text>
        {`. Cook County may from time to time in its sole discretion develop and provide Application updates, which may include upgrades, bug fixes, patches, other error corrections, and/or new features (collectively, including related documentation, "Updates"). Updates may also modify or delete in their entirety certain features and functionality. You agree that Cook County has no obligation to provide any Updates or to continue to provide or enable any particular features or functionality. Based on your Mobile Device settings, when your Mobile Device is connected to the internet either:

        (a) the Application will automatically download and install all available Updates; or

        (b) you may receive notice of or be prompted to download and install available Updates.

        You shall promptly download and install all Updates and acknowledge and agree that the Application or portions thereof may not properly operate should you fail to do so. You further agree that all Updates will be deemed part of the Application and be subject to all terms and conditions of this Agreement.


        8. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Third-Party Materials"}</Text>
        <Text>
        {`. The Application may display, include, or make available third-party content (including data, information, applications, and other products, services, and/or materials) or provide links to third-party websites or services, including through third-party advertising ("Third-Party Materials"). You acknowledge and agree that Cook County is not responsible for Third-Party Materials, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality, or any other aspect thereof. Cook County does not assume and will not have any liability or responsibility to you or any other person or entity for any Third-Party Materials. Third-Party Materials and links thereto are provided solely as a convenience to you, and you access and use them entirely at your own risk and subject to such third parties' terms and conditions.


        9. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Term and Termination"}</Text>
        <Text>
        {`.

          (a) The term of Agreement commences when you download or install the Application or acknowledge your acceptance and will continue in effect until terminated by you or Cook County as set forth in this Section 9.

          (b) You may terminate this Agreement by deleting the Application and all copies thereof from your Mobile Device.

          (c) Cook County may terminate this Agreement at any time without notice if it ceases to support the Application, which Cook County may do at any time and in its sole discretion. In addition, this Agreement will terminate immediately and automatically without any notice if you violate any of the terms and conditions of this Agreement.

          (d) Upon termination:

          (i) all rights granted to you under this Agreement will also terminate; and

          (ii) you must cease all use of the Application and delete all copies of the Application from your Mobile Device and account.

          (e) Termination will not limit any of Cook County's rights or remedies at law or in equity.


        10. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Disclaimer of Warranties"}</Text>
        <Text>
        {`.THE APPLICATION IS PROVIDED TO END USER "AS IS" AND WITH ALL FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, COOK COUNTY, ON ITS OWN BEHALF AND ON BEHALF OF ITS AFFILIATES AND ITS AND THEIR RESPECTIVE LICENSORS AND SERVICE PROVIDERS, EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, WITH RESPECT TO THE APPLICATION, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND WARRANTIES THAT MAY ARISE OUT OF COURSE OF DEALING, COURSE OF PERFORMANCE, USAGE, OR TRADE PRACTICE. WITHOUT LIMITATION TO THE FOREGOING, COOK COUNTY PROVIDES NO WARRANTY OR UNDERTAKING, AND MAKES NO REPRESENTATION OF ANY KIND THAT THE APPLICATION WILL MEET YOUR REQUIREMENTS, ACHIEVE ANY INTENDED RESULTS, BE COMPATIBLE, OR WORK WITH ANY OTHER SOFTWARE, APPLICATIONS, SYSTEMS, OR SERVICES, OPERATE WITHOUT INTERRUPTION, MEET ANY PERFORMANCE OR RELIABILITY STANDARDS, OR BE ERROR-FREE, OR THAT ANY ERRORS OR DEFECTS CAN OR WILL BE CORRECTED.

        SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF OR LIMITATIONS ON IMPLIED WARRANTIES OR THE LIMITATIONS ON THE APPLICABLE STATUTORY RIGHTS OF A CONSUMER, SO SOME OR ALL OF THE ABOVE EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU.


        11. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Limitation of Liability"}</Text>
        <Text>
        {`. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL COOK COUNTY OR ITS AFFILIATES, OR ANY OF ITS OR THEIR RESPECTIVE LICENSORS OR SERVICE PROVIDERS, HAVE ANY LIABILITY ARISING FROM OR RELATED TO YOUR USE OF OR INABILITY TO USE THE APPLICATION OR THE CONTENT AND SERVICES FOR:

        (a) PERSONAL INJURY, PROPERTY DAMAGE, LOST PROFITS, COST OF SUBSTITUTE GOODS OR SERVICES, LOSS OF DATA, LOSS OF GOODWILL, BUSINESS INTERRUPTION, COMPUTER FAILURE OR MALFUNCTION, OR ANY OTHER CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL, OR PUNITIVE DAMAGES.

        (b) DIRECT DAMAGES IN AMOUNTS THAT IN THE AGGREGATE EXCEED THE AMOUNT ACTUALLY PAID BY YOU FOR THE APPLICATION.

        THE FOREGOING LIMITATIONS WILL APPLY WHETHER SUCH DAMAGES ARISE OUT OF BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE AND REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE OR COOK COUNTY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS OF LIABILITY SO SOME OR ALL OF THE ABOVE LIMITATIONS OF LIABILITY MAY NOT APPLY TO YOU.


        12. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Indemnification"}</Text>
        <Text>
        {`. You agree to indemnify, defend, and hold harmless Cook County and its officers, directors, employees, agents, affiliates, successors, and assigns from and against any and all losses, damages, liabilities, deficiencies, claims, actions, judgments, settlements, interest, awards, penalties, fines, costs, or expenses of whatever kind, including attorneys' fees, arising from or relating to your use or misuse of the Application or your breach of this Agreement, including but not limited to any content you submit or make available through this Application.


        13. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Export Regulation"}</Text>
        <Text>
        {`. The Application may be subject to US export control laws, including the Export Control Reform Act and its associated regulations. You shall not, directly or indirectly, export, re-export, or release the Application to, or make the Application accessible from, any jurisdiction or country to which export, re-export, or release is prohibited by law, rule, or regulation. You shall comply with all applicable federal laws, regulations, and rules, and complete all required undertakings (including obtaining any necessary export license or other governmental approval), prior to exporting, re-exporting, releasing, or otherwise making the Application available outside the US.


        14. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"US Government Rights"}</Text>
        <Text>
        {`. The Application is commercial computer software, as such term is defined in 48 C.F.R. §2.101. Accordingly, if you are an agency of the US Government or any contractor therefor, you receive only those rights with respect to the Application as are granted to all other end users under license, in accordance with (a) 48 C.F.R. §227.7201 through 48 C.F.R. §227.7204, with respect to the Department of Defense and their contractors, or (b) 48 C.F.R. §12.212, with respect to all other US Government licensees and their contractors.


        15. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Severability"}</Text>
        <Text>
        {`. If any provision of this Agreement is illegal or unenforceable under applicable law, the remainder of the provision will be amended to achieve as closely as possible the effect of the original term and all other provisions of this Agreement will continue in full force and effect; provided, however, that if any fundamental term or provision of this Agreement, is invalid, illegal, or unenforceable, the remainder of this Agreement shall be unenforceable.


        16. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Governing Law"}</Text>
        <Text>
        {`. This Agreement is governed by and construed in accordance with the internal laws of the State of Illinois without giving effect to any choice or conflict of law provision or rule. Any legal suit, action, or proceeding arising out of or related to this Agreement or the Application shall be instituted exclusively in the federal courts of the United States or the courts of the State of Illinois in each case located in Chicago and Cook County. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.


        17. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Limitation of Time to File Claims"}</Text>
        <Text>
        {`. ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THIS AGREEMENT OR THE APPLICATION MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES OTHERWISE SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.


        18. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Entire Agreement"}</Text>
        <Text>
        {`. This Agreement, Terms of Service, and our Privacy Policy constitute the entire agreement between you and Cook County with respect to the Application and supersede all prior or contemporaneous understandings and agreements, whether written or oral, with respect to the Application.


        19. `}
        </Text>

        <Text style={{textDecorationLine: 'underline'}}>{"Waiver"}</Text>
        <Text>
        {`. No failure to exercise, and no delay in exercising, on the part of either party, any right or any power hereunder shall operate as a waiver thereof, nor shall any single or partial exercise of any right or power hereunder preclude further exercise of that or any other right hereunder. In the event of a conflict between this Agreement and any applicable purchase or other terms, the terms of this Agreement shall govern.`}
        </Text>
        
      </ScrollView>
    </View>
  )
}

// Helper component to create an ordered list
// props include:
// - items : array of text items in the unordered list
function OL(props) {
  let out = ""
  for(let i = 0; i < props.items.length; i++) {
    let item = props.items[i]
    out += ("\t" + i + ". " + item + "\n")
  }
  return (
    <Text style="">{out}</Text>
    <Text style="indent....">{out}</Text>
  )
}

export default LicenseAgreementScreen;
