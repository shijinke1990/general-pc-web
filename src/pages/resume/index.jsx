import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { Button, Tooltip, Image } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Occupation from '@assets/icons/occupation.svg?react';
import SalaryExpectation from '@assets/icons/salaryExpectation.svg?react';
import Phone from '@assets/icons/phone.svg?react';
import Email from '@assets/icons/email.svg?react';
import Github from '@assets/icons/github.svg?react';
import WeChat from '@assets/icons/weChat.svg?react';
import Website from '@assets/icons/website.svg?react';
import html2canvas from 'html2canvas';
import CopyText from '@components/CopyText';
import { jsPDF } from 'jspdf';
import { loadDetail } from '@services/resumes';
import { useParams } from 'react-router-dom';

export default function Resume() {
  const container = React.useRef(null);
  const { id } = useParams();
  const [resume, setResume] = React.useState([]);
  const downloadResume = () => {
    const wrapper = document.getElementById('wrapper');
    const options = {
      scale: 3,
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
      let yPosition = yPos;
      const addPage = () => {
        pdf.addPage();
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
      pdf.save(resume.title + '.pdf');
    });
  };

  useEffect(() => {
    loadDetail({ _id: id }).then(res => {
      console.log(res);
      setResume(res.resume);
    });
  }, []);

  return (
    <div className={styles.container} ref={container}>
      <div className={styles.header}>
        <Button ghost icon={<DownloadOutlined />} iconPosition='end' onClick={downloadResume}>
          下载简历
        </Button>
      </div>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.wrapper} id='wrapper'>
            <div className={styles.profile}>
              <div className={styles.avatar}>
                <img
                  src='/avatar.png'
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'contain',
                  }}
                  alt='avatar'
                />
              </div>

              {resume.nickName && (
                <div className={styles.nickname}>
                  <Tooltip placement='top' title='姓名'>
                    <div>{resume.nickName}</div>
                  </Tooltip>
                  {resume.state && (
                    <div className={styles.state}>
                      <span>（{resume.state}）</span>
                    </div>
                  )}
                </div>
              )}

              <div className={styles.introduction}>
                <div className={styles.intention}>
                  {resume.occupation && (
                    <div className={styles.item}>
                      <Tooltip placement='top' title='求职方向'>
                        <Occupation
                          style={{
                            width: '16px',
                            height: '16px',
                          }}
                        />
                      </Tooltip>

                      <span>{resume.occupation}</span>
                    </div>
                  )}
                  {resume.salaryExpectation && (
                    <div className={styles.item}>
                      <Tooltip placement='top' title='期望薪资'>
                        <SalaryExpectation
                          style={{
                            width: '16px',
                            height: '16px',
                          }}
                        />
                      </Tooltip>
                      <span>{resume.salaryExpectation ? resume.salaryExpectation : '面议'}</span>
                    </div>
                  )}
                </div>
                <div className={styles.contact}>
                  {resume.phone && (
                    <div className={styles.item}>
                      <Tooltip placement='top' title='手机号码'>
                        <Phone
                          style={{
                            width: '16px',
                            height: '16px',
                          }}
                        />
                      </Tooltip>

                      <CopyText>{resume.phone}</CopyText>
                      <span></span>
                    </div>
                  )}
                  {resume.email && (
                    <div className={styles.item}>
                      <Tooltip placement='top' title='电子邮箱'>
                        <Email
                          style={{
                            width: '16px',
                            height: '16px',
                          }}
                        />
                      </Tooltip>
                      <CopyText>{resume.email}</CopyText>
                    </div>
                  )}

                  {resume.weChat && (
                    <div className={styles.item}>
                      <Tooltip placement='top' title='微信'>
                        <WeChat
                          style={{
                            width: '16px',
                            height: '16px',
                          }}
                        />
                      </Tooltip>

                      <CopyText>{resume.weChat}</CopyText>
                    </div>
                  )}
                </div>
                <div className={styles.contact}>
                  {resume.github && (
                    <div className={styles.item}>
                      <Tooltip placement='top' title='github'>
                        <Github
                          style={{
                            width: '16px',
                            height: '16px',
                          }}
                        />
                      </Tooltip>

                      <a href={`https://github.com/${resume.github}`} target='_blank' rel='noreferrer'>
                        {resume.github}
                      </a>
                    </div>
                  )}

                  {resume.website && (
                    <div className={styles.item}>
                      <Tooltip placement='top' title='个人网站'>
                        <Website
                          style={{
                            width: '16px',
                            height: '16px',
                          }}
                        />
                      </Tooltip>

                      <a href={`https://${resume.website}`} target='_blank' rel='noreferrer'>
                        {resume.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {resume?.skills?.length > 0 && (
              <div className={styles.skills}>
                <div className={styles.title}>专业技能</div>
                <div className={styles.content}>
                  {resume?.skills?.map((item, index) => (
                    <div className={styles.item} key={index}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {resume?.workExperience?.length > 0 && (
              <div className={styles.experiences}>
                <div className={styles.title}>工作经历</div>
                <div className={styles.content}>
                  {resume?.workExperience.map((item, index) => (
                    <div className={styles.item} key={index}>
                      <div className={styles.header}>
                        <div className={styles.time}>{item.time}</div>
                        <div className={styles.company}>{item.company}</div>
                      </div>
                      <div className={styles.label}>{item.title}</div>
                      <div className={styles.description}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {resume?.projectExperience?.length > 0 && (
              <div className={styles.experiences}>
                <div className={styles.title}>项目经历</div>
                <div className={styles.content}>
                  {resume?.projectExperience.map((item, index) => (
                    <div className={styles.item} key={index}>
                      <div className={styles.header}>
                        <div className={styles.company}>{item.projectName}</div>
                        <div className={styles.time}>{item.time}</div>
                      </div>
                      <div className={styles.label}>{item.title}</div>
                      <div className={styles.description}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {resume?.educationExperience?.length > 0 && (
              <div className={styles.experiences}>
                <div className={styles.title}>教育经历</div>
                <div className={styles.content}>
                  {resume?.educationExperience.map((item, index) => (
                    <div className={styles.item} key={index}>
                      <div className={styles.header}>
                        <div className={styles.time}>{item.time}</div>
                        <div className={styles.company}>{item.school}</div>
                      </div>
                      <div className={styles.label}>{item.major}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
