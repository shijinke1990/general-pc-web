import React from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';
import Icon from '@ant-design/icons';
import CopyButton from '@components/CopyButton';
import { DownloadOutlined } from '@ant-design/icons';
import Occupation from '@assets/icons/occupation.svg?react';
import SalaryExpectation from '@assets/icons/salaryExpectation.svg?react';
import Phone from '@assets/icons/phone.svg?react';
import Email from '@assets/icons/email.svg?react';
import Github from '@assets/icons/github.svg?react';

import Wechat from '@assets/icons/wechat.svg?react';
import Website from '@assets/icons/website.svg?react';
import html2canvas from 'html2canvas';

import { jsPDF } from 'jspdf';

export default function Resume() {
  const container = React.useRef(null);
  const downloadResume = () => {
    const wrapper = document.getElementById('wrapper');
    const options = {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: true,
      width: wrapper.offsetWidth,
      height: wrapper.offsetHeight,
    };
    html2canvas(wrapper, options).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
      const imgWidth = canvas.width * ratio;
      const imgHeight = canvas.height * ratio;
      const xPos = (pdfWidth - imgWidth) / 2;
      const yPos = (pdfHeight - imgHeight) / 2;
      let currentPage = 1;
      console.log('imgWidth', imgWidth);
      console.log('imgHeight', imgHeight);
      console.log('pdfWidth', pdfWidth);
      console.log('pdfHeight', pdfHeight);

      let yPosition = yPos;
      const addPage = () => {
        pdf.addPage();
        currentPage++;
        yPosition = yPos;
      };
      const addImageToPage = () => {
        pdf.addImage(imgData, 'JPEG', xPos, yPosition, imgWidth, imgHeight);
      };
      const checkPageOverflow = () => {
        const remainingHeight = pdfHeight - yPosition;
        if (remainingHeight < imgHeight) {
          addPage();
        }
      };
      addImageToPage();
      checkPageOverflow();
      pdf.save('download.pdf');
    });
  };

  return (
    <div className={styles.container} ref={container}>
      <div className={styles.header}>
        <Button ghost icon={<DownloadOutlined />} iconPosition='end' onClick={downloadResume}>
          下载简历
        </Button>
      </div>
      <div className={styles.body}>
        <div className={styles.wrapper} id='wrapper'>
          <div className={styles.profile}>
            <div className={styles.avatar}>
              <img src='https://avatars.githubusercontent.com/u/21263805?v=4' alt='avatar' />
            </div>
            <div className={styles.nickname}>
              <div>施锦科</div>
              <div className={styles.state}>（已离职）</div>
            </div>
            <div className={styles.introduction}>
              <div className={styles.intention}>
                <div className={styles.item}>
                  <Occupation
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <span>前端工程师</span>
                </div>

                <div className={styles.item}>
                  <SalaryExpectation
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <span>20k-30k</span>
                </div>
              </div>
              <div className={styles.contact}>
                <div className={styles.item}>
                  <Phone
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <CopyButton>15067138690</CopyButton>
                  <span></span>
                </div>
                <div className={styles.item}>
                  <Email
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <CopyButton>shijinke1990@qq.com</CopyButton>
                </div>

                <div className={styles.item}>
                  <Wechat
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <CopyButton>CODER_SJK</CopyButton>
                </div>
              </div>
              <div className={styles.contact}>
                <div className={styles.item}>
                  <Github
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <a href='https://github.com/shijinke1990' target='_blank' rel='noreferrer'>
                    shijinke1990
                  </a>
                </div>

                <div className={styles.item}>
                  <Website
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <a href='https://lianlianbushe.com' target='_blank' rel='noreferrer'>
                    lianlianbushe.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.skills}>
            <div className={styles.title}>专业技能</div>
            <div className={styles.content}>
              <div className={styles.item}>熟悉HTML5/CSS3/Javascript</div>
              <div className={styles.item}>熟悉http协议、常见数据结构与算法</div>
              <div className={styles.item}>熟练掌握Vue/React</div>
              <div className={styles.item}>熟悉nodejs，有nodejs服务端开发经验</div>
              <div className={styles.item}>熟悉前端模块化、编译、构建，熟悉webpack/vite常见用法；</div>
              <div className={styles.item}>熟悉SSR服务端渲染，对搜索引擎优化有一定经验</div>
              <div className={styles.item}>熟悉使用 Git 协作开发；</div>
              <div className={styles.item}>熟悉低代码开发</div>
            </div>
          </div>
          <div className={styles.skills}>
            <div className={styles.title}>专业技能</div>
            <div className={styles.content}>
              <div className={styles.item}>熟悉HTML5/CSS3/Javascript</div>
              <div className={styles.item}>熟悉http协议、常见数据结构与算法</div>
              <div className={styles.item}>熟练掌握Vue/React</div>
              <div className={styles.item}>熟悉nodejs，有nodejs服务端开发经验</div>
              <div className={styles.item}>熟悉前端模块化、编译、构建，熟悉webpack/vite常见用法；</div>
              <div className={styles.item}>熟悉SSR服务端渲染，对搜索引擎优化有一定经验</div>
              <div className={styles.item}>熟悉使用 Git 协作开发；</div>
              <div className={styles.item}>熟悉低代码开发</div>
            </div>
          </div>
          <div className={styles.skills}>
            <div className={styles.title}>专业技能</div>
            <div className={styles.content}>
              <div className={styles.item}>熟悉HTML5/CSS3/Javascript</div>
              <div className={styles.item}>熟悉http协议、常见数据结构与算法</div>
              <div className={styles.item}>熟练掌握Vue/React</div>
              <div className={styles.item}>熟悉nodejs，有nodejs服务端开发经验</div>
              <div className={styles.item}>熟悉前端模块化、编译、构建，熟悉webpack/vite常见用法；</div>
              <div className={styles.item}>熟悉SSR服务端渲染，对搜索引擎优化有一定经验</div>
              <div className={styles.item}>熟悉使用 Git 协作开发；</div>
              <div className={styles.item}>熟悉低代码开发</div>
            </div>
          </div>
          <div className={styles.skills}>
            <div className={styles.title}>专业技能</div>
            <div className={styles.content}>
              <div className={styles.item}>熟悉HTML5/CSS3/Javascript</div>
              <div className={styles.item}>熟悉http协议、常见数据结构与算法</div>
              <div className={styles.item}>熟练掌握Vue/React</div>
              <div className={styles.item}>熟悉nodejs，有nodejs服务端开发经验</div>
              <div className={styles.item}>熟悉前端模块化、编译、构建，熟悉webpack/vite常见用法；</div>
              <div className={styles.item}>熟悉SSR服务端渲染，对搜索引擎优化有一定经验</div>
              <div className={styles.item}>熟悉使用 Git 协作开发；</div>
              <div className={styles.item}>熟悉低代码开发</div>
            </div>
          </div>
          <div className={styles.skills}>
            <div className={styles.title}>专业技能</div>
            <div className={styles.content}>
              <div className={styles.item}>熟悉HTML5/CSS3/Javascript</div>
              <div className={styles.item}>熟悉http协议、常见数据结构与算法</div>
              <div className={styles.item}>熟练掌握Vue/React</div>
              <div className={styles.item}>熟悉nodejs，有nodejs服务端开发经验</div>
              <div className={styles.item}>熟悉前端模块化、编译、构建，熟悉webpack/vite常见用法；</div>
              <div className={styles.item}>熟悉SSR服务端渲染，对搜索引擎优化有一定经验</div>
              <div className={styles.item}>熟悉使用 Git 协作开发；</div>
              <div className={styles.item}>熟悉低代码开发</div>
            </div>
          </div>
          <div className={styles.experiences}>
            <div className={styles.title}>工作经历</div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.time}>2019.07-2021.07</div>
                <div className={styles.company}>杭州悦途科技有限公司</div>
              </div>
              <div className={styles.label}>前端工程师</div>
              <div className={styles.description}>
                <div className={styles.item}>负责公司前端项目的开发与维护；</div>
                <div className={styles.item}>负责公司内部低代码平台的开发与维护；</div>
              </div>
            </div>
          </div>
          <div className={styles.experiences}>
            <div className={styles.title}>工作经历</div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.time}>2019.07-2021.07</div>
                <div className={styles.company}>杭州悦途科技有限公司</div>
              </div>
              <div className={styles.label}>前端工程师</div>
              <div className={styles.description}>
                <div className={styles.item}>负责公司前端项目的开发与维护；</div>
                <div className={styles.item}>负责公司内部低代码平台的开发与维护；</div>
              </div>
            </div>
          </div>
          <div className={styles.experiences}>
            <div className={styles.title}>工作经历</div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.time}>2019.07-2021.07</div>
                <div className={styles.company}>杭州悦途科技有限公司</div>
              </div>
              <div className={styles.label}>前端工程师</div>
              <div className={styles.description}>
                <div className={styles.item}>负责公司前端项目的开发与维护；</div>
                <div className={styles.item}>负责公司内部低代码平台的开发与维护；</div>
              </div>
            </div>
          </div>
          <div className={styles.experiences}>
            <div className={styles.title}>工作经历</div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.time}>2019.07-2021.07</div>
                <div className={styles.company}>杭州悦途科技有限公司</div>
              </div>
              <div className={styles.label}>前端工程师</div>
              <div className={styles.description}>
                <div className={styles.item}>负责公司前端项目的开发与维护；</div>
                <div className={styles.item}>负责公司内部低代码平台的开发与维护；</div>
              </div>
            </div>
          </div>

          <div className={styles.experiences}>
            <div className={styles.title}>项目经历</div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.time}>2019.07-2021.07</div>
                <div className={styles.company}>菠萝卜</div>
              </div>
              <div className={styles.label}>前端+nodejs开发</div>
              <div className={styles.description}>
                <div className={styles.item}>
                  该项目有三部分组成。移动web端使用vue3，组件库使用的是vant，状态共享方案使用的是pinia；该项目中的进入活动页需要实时显示当前活动中参与者信息和自己被选择的状态，使用的是socke.io；项目允许账号密码和验证码登录，登录都是通过token后缓存到localStorage的方案，脚手架使用的是vite。管理后台使用的也是vue3，组件库使用的是elementPlus；管理后台实现了可自己增删菜单，可创建角色为角色配置菜单权限，为账号设置角色，不同角色权限的账号登录显示不同菜单。后端采用的是Nodejs，框架使用的是koa2，数据库用的是mongoDB，NodejS中使用的mongoose操作MongoDB；整个项目websocket都是用的socket.io，所有的长连接都通过服务器进行转发的并做了权限验证（校验token）。
                </div>
              </div>
            </div>
          </div>
          <div className={styles.experiences}>
            <div className={styles.title}>教育经历</div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.time}>2011.9 - 2015.6</div>
                <div className={styles.company}>华中科技大学文华学院</div>
              </div>
              <div className={styles.label}>工商管理 本科</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
