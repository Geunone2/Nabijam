import React, {useEffect, useState} from 'react';

export default function TermsCheck() {
    const [allCheck, setAllCheck] = useState(false);
    const [ageCheck, setAgeCheck] = useState(false);
    const [useCheck, setUseCheck] = useState(false);
    const [collectCheck, setCollectCheck] = useState(false);
    const [marketingCheck, setMarketingCheck] = useState(false);
    const [termsError, setTermsError] = useState(false);
    const AllBtnCheck = () => {
        if (!allCheck) {
            setAllCheck(true);
            setAgeCheck(true);
            setUseCheck(true);
            setCollectCheck(true);
            setMarketingCheck(true);
        } else {
            setAllCheck(false);
            setAgeCheck(false);
            setUseCheck(false);
            setCollectCheck(false);
            setMarketingCheck(false);
        }
    }

    const AgeBtnCheck = () => {
        if (!ageCheck) {
            setAgeCheck(true)
        } else {
            setAgeCheck(false)
        }
    }

    const UseBtnCheck = () => {
        if (!useCheck) {
            setUseCheck(true)
        } else {
            setUseCheck(false)
        }
    }

    const CollectBtnCheck = () => {
        if (!collectCheck) {
            setCollectCheck(true)
        } else {
            setCollectCheck(false)
        }
    }

    const MarketingBtnCheck = () => {
        if (!marketingCheck) {
            setMarketingCheck(true)
        } else {
            setMarketingCheck(false);
        }
    }

    useEffect(() => {
        if (ageCheck && useCheck && collectCheck && marketingCheck) {
            setAllCheck(true);
            setTermsError(false);
        } else {
            setAllCheck(false);
            if (!ageCheck || !useCheck || !collectCheck) {
                setTermsError(true);
            } else {
                setTermsError(false);
            }
        }
    }, [ageCheck, useCheck, collectCheck, marketingCheck]);


    return (
        <div className='flex flex-col'>
            <div className="w-full mt-12  border-[1px] border-lightGray/30"></div>
            <label className='text-ms font-semibold w-full text-wrap mt-4 mb-2 '>약관동의   {termsError && (<div className='text-red-500'>필수 약관에 모두 동의하셔야 합니다.</div>)}</label>
            <div className='flex flex-col gap-2 text-nowrap overflow-hidden'>
                <div className='mx-4'>
                    <input type="checkbox" id="check1" checked={ageCheck} onChange={AgeBtnCheck}/>
                    <label htmlFor='check1' className='mx-1'>본인은 만 14세 이상입니다.<span
                        className='text-blue-500'> (필수)</span></label>
                </div>

                <div className='mx-4'>
                    <input type="checkbox" id="check2" checked={useCheck} onChange={UseBtnCheck}/>
                    <label htmlFor='check2' className='mx-1'>이용 약관 동의<span className='text-blue-500'> (필수)</span></label>
                </div>

                <div className='mx-4'>
                    <input type="checkbox" id="check3" checked={collectCheck} onChange={CollectBtnCheck}/>
                    <label htmlFor='check3' className='mx-1'>개인 정보 수집•이용 동의<span className='text-blue-500'> (필수)</span></label>
                </div>

                <div className='mx-4'>
                    <input type="checkbox" id="check4" checked={marketingCheck} onChange={MarketingBtnCheck}/>
                    <label htmlFor='check4' className='mx-1'>개인정보 제3자 제공 동의<span className='text-gray-500'> (선택)</span></label>
                </div>

                <div className='font-semibold mx-4'>
                    <input type="checkbox" id="all-check" checked={allCheck} onChange={AllBtnCheck}/>
                    <label htmlFor="all-check" className='mx-1'>전체 동의</label>
                </div>
            </div>
        </div>
    );
}