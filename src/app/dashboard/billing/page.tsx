
export const dynamic = 'force-dynamic';

import BillingForm from "@/components/BillingForm"
import { getUserSubscriptionPlan } from "@/lib/stripe"

const Page = async () => {
    const subscriptionPlan = await getUserSubscriptionPlan()
    if(!subscriptionPlan)
        return <>subscription plan null</>

    return <BillingForm subscriptionPlan={subscriptionPlan} /> 
}

export default Page