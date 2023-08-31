import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaQuestionCircle, FaWeixin } from 'react-icons/fa';
import QR2 from '../../assets/QR2.jpg';
import QR_Me from '../../assets/QR_Me.jpg';

const UserInstructions = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500 p-4 lg:p-8">
            <div className="bg-white w-full lg:w-2/3 xl:w-1/2 rounded-lg shadow-2xl p-4 lg:p-8 mx-2 lg:mx-0">
                <h2 className="text-2xl sm:text-3xl text-center font-semibold mb-6 text-gray-800">
                    <FaUsers className="inline mr-2" /> 用户须知 & 社区公约
                </h2>
                <ul className="list-inside text-gray-700 mb-8 border-b-2 pb-6">
                    <li className="text-red-500 mb-2">请务必遵守本站的各项规定，违反者会请出去的，没有例外。</li>
                    <li className="font-semibold mb-2">1. 可以讨论问题，可以表达观点，但不能破坏和谐尊重的整体氛围。</li>
                    <li className="mb-2">真理越辩越明，朋友越辩越少，不要好为人师，万万注意表达观点的方式。</li>
                    <li className="font-semibold mb-2">2. 对性骚扰零容忍!</li>
                    <li className="mb-2">尊重女性朋友，不要开自以为是的玩笑。</li>
                    <li className="mb-2">说话可以生动活泼，但是请根据常识判断对方是否处于舒适的状态。</li>
                    <li className="mb-2">性骚扰的标准为当事女生是否投诉，如投诉，会请出去。</li>
                </ul>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4"><FaQuestionCircle className="inline mr-2" /> 一些常见问题可查看这几个链接：</h3>
                    <a href="https://backend.aaron404.com/zh-hans/eac-log/%E5%A7%8B%E4%BA%8E%E5%A3%B0%E5%8A%A8%E6%AD%8C%E4%BC%9A%E5%BC%80%E6%94%BE%E6%B3%A8%E5%86%8C/" className="underline text-blue-500">
                        注册和活动说明
                    </a>

                    <p className="mt-2">
                        我们的网址是 https://eac.aaron404.com,你可以收藏一下，或者添加到主页，以便下次访问。
                    </p>
                </div>
                <div className="mt-6 flex flex-col lg:flex-row items-center justify-center">
                    <div className="border-b-2 pb-4 mb-4 lg:mb-0 lg:mr-4 lg:border-b-0">
                        <p>由于阿咔社区的群已经超过200人，二维码已经失效，这是我个人的微信号，加的时候请给我个备注</p>
                        <img src={QR_Me} alt="EAC 微信群" className="w-72 mb-4"/>
                        <p className="text-center text-gray-700">加我的时候备注一下，我拉你入群，其实加不加群都无所谓，网站有公告的。</p>
                    </div>
                    <div>
                        <img src={QR2} alt="九月歌会的活动群" className="w-72"/>
                        <p className="text-center text-red-500 mt-2">注意：这是请参与活动的唱歌歌手可加入此群</p>
                    </div>
                </div>
                <div className="mt-6">
                    <Link to="/" className="bg-blue-500 text-white py-2 rounded-lg text-center block w-full hover:bg-blue-600">
                       现在进入 EAC 主页
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserInstructions;
