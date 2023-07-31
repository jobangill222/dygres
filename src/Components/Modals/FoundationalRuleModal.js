import React from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";


export default function FoundationalRuleModal(props) {

    const { isShowFoundationalRulePopup, setIsShowFoundationalRuleModal } = props;

    const closePopup = async () => {
        setIsShowFoundationalRuleModal(false)
    }

    return (
        <>
            <Modal
                className="Actions-modal awards-modal welcomepopup Foundationalmodal"
                show={isShowFoundationalRulePopup}
                onHide={closePopup}
                centered
            >
                <Modal.Header closeButton >
                    <Modal.Title>Foundational Rules</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div className='terms-content'>
                            <h4>1. You agree to take full responsibility for everything that you post.</h4>
                            <p>By using dygres, you agree to the platform’s rules. dygres is an evolving platform, and these rules are subject to change without notice.</p>
                            <p>dygres users are ages 16 and up. Anything you wouldn’t expose a 16 year old to, you shouldn’t post on our platform.</p>
                            <h4>2. You are who you say you are:</h4>
                            <h5>NO Misleading and Deceptive Identities: </h5>
                            <p>You may not impersonate any individual, group, organization, or member of the dygres team. You may not attempt to mislead, confuse, deceive others, or use a false identity in a manner that disrupts the experience of others on dygres. These activities may result in a permanent ban.</p>
                            <h5>NO Misleading and Deceptive Content:</h5>
                            <h5>Specific Rules for Synthetic media, manipulated media, and AI generated content: </h5>
                            <p>Any AI generated content must be clearly labeled as such within the post. Accounts that are run by or make considerable use of AI generated content must also be clearly labeled in the account’s bio. <u>These accounts may be subject to additional labels or restrictions. </u>
                            </p>
                            <p>You may not deceptively share synthetic or manipulated media that is likely to or intended to cause harm. In addition, we may label any content containing synthetic or manipulated media to help users verify the source of information and to provide additional context where needed.
                            </p>
                            <h5>Copyright and trademark: </h5>
                            <p>You take full responsibility for everything that you post. By posting content, you acknowledge that you have the rights to post that content. You may not violate others’ intellectual property rights, including copyright and trademark.
                            </p>
                            <h4>Do no harm:
                            </h4>
                            <p><u>Abuse/harassment:</u> Abuse, harassment, and cyberbullying are not tolerated. Inciting abuse or harassment is also not allowed.
                            </p>
                            <p><u>Hateful conduct:</u> Do not promote violence against, threaten, or harass individuals or groups on the basis of race, ethnicity, national origin, caste, sexual orientation, gender, gender identity, religious affiliation, age, disability, or serious disease.
                            </p>
                            <h5>Doxxing:</h5>
                            <h4>Doxxing, phishing, and witch hunting are inherently likely and intended to cause harm.</h4>
                            <p>Posting personal identifying information of any minor is considered doxxing and will result in an immediate permanent ban.</p>
                            <h5>What is doxxing?</h5>
                            <p>If the person is the age of majority, posting any personal information that is not otherwise publicly available, or provided with the individual’s explicit consent, is also considered doxxing.</p>
                            <p>Attempting to bait individuals to provide personal information (“phishing”), is also prohibited.</p>
                            <p>For example: providing a public figure’s email address that is publicly available on their website, is not considered doxxing. Providing a private email address or location data, is doxxing.</p>
                            <h5>Doxxing is not allowed on dygres. If you’re not sure, don’t do it.</h5>
                            <p>Violence: Threatening violence against an individual or a group of people is prohibited. Any attempts to glorify or promote violence will lead to an immediate ban.
                            </p>
                            <h5>Tip: Have a glass of water and walk away yo!</h5>
                            <p><u>Terrorism/violent extremism/Perpetrators of violent attacks:</u> Threatening or promoting terrorism or any form of violent extremism is prohibited. Attempting to use dygres to arrange, threaten, or promote terrorist acts, or any form of violent extremism will result in an immediate ban.</p>
                            <p><u>Tragedy Cooldown Period:</u> Please be sensitive to the victims of tragedies. Making light of the suffering of victims of tragic events is just poor form. dygres has a tragedy cooldown period of at least 30 days following global unfortunate events. dygres users are asked to avoid making light of these events during the cooldown period.</p>
                            <p><u>Child sexual exploitation:</u> Any form of child exploitation will result in an immediate and permanent ban. </p>
                            <h5>Tip: Just don't.</h5>
                            <p><u>Suicide or self-harm:</u> Suicide baiting, promoting or encouraging suicide or self-harm towards any individual or group of people will not be tolerated.
                            </p>
                            <p>Sensitive media, including graphic violence and explicit adult content:</p>
                            <h5>What is and isn’t okay on dygres?</h5>
                            <p>Refrain from sharing any links or images that promote or showcase excessively gory, violent, or pornographic adult content. </p>
                            <h5><b>We take the view of pornographic imagery that we know it when we see it. Please use common sense. Do not expose other users to graphic imagery that they don’t want to see.</b> Anything that depicts a sexual act is considered pornographic. Pornographic or overtly sexualized images of individuals, such as celebrities, including deepfakes, are considered sexual harassment.</h5>
                            <p>Historical works of art are welcome, so long as they conform to all other dygres rules.</p>
                            <p>Press accounts are expected to use journalistic integrity and content standards expected with broadcast media.</p>
                            <h5>Tip: This is a hub for discussion and socialising. Do those yo! </h5>
                            <p><u>Illegal or certain regulated goods or services:</u> You may not use our service for unlawful purposes or in furtherance of illegal activities. This includes selling, buying, or facilitating transactions in illegal goods or services, as well as certain types of regulated goods or services.</p>
                            <p><u>Platform manipulation and spam:</u> You may not use dygres in a manner intended to artificially amplify or suppress information or engage in behavior that manipulates or disrupts people’s experience on dygres. This also includes the deliberate spread of harmful misinformation.</p>
                            <p><u>Dygres is independent of political affiliation and supports free and fair elections worldwide:</u> You may not use dygres for the purpose of manipulating or interfering in elections or other civic processes. This includes posting or sharing content that may suppress participation or mislead people about when, where, or how to participate in a civic process. Any politically affiliated content must conform to the other rules of dygres.</p>

                        </div>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

