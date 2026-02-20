"use client";

import React from "react";
import Image from "next/image";
import AutoPlay from "embla-carousel-autoplay";

import styles from "./detail.module.scss";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Tag from "./tag";

const Detail = ({ project }) => {
  return (
    <>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>
            <div className={styles.titleBox}>
              <span className={styles.title}>{project.name}</span>
              {project.isImportant && (
                <span className={styles.important}>주요 프로젝트</span>
              )}
            </div>
          </CardTitle>
          {project.date.length > 1 ? (
            project.date.map((date, index) => (
              <p key={index} className={styles.date}>
                <span className="text-muted-foreground">
                  {index + 1}차 개발
                </span>
                <span className={styles.value}>{date}</span>
              </p>
            ))
          ) : (
            <p className={styles.date}>
              <span className="text-muted-foreground">개발 기간</span>
              <span className={styles.value}>{project.date[0]}</span>
            </p>
          )}
          <CardDescription className={styles.desc}>
            {project.descriptions.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {project.skills.map((skill, index) => (
            <Tag key={index} title={skill.title} isActive={skill.isActive} />
          ))}
          <ul className={styles.develop}>
            {project.develop.map((develop, index) => (
              <li key={index}>{develop}</li>
            ))}
          </ul>
          {project.video && (
            <div className={styles.videoContainer}>
              {project.video.includes("youtube") ? (
                <iframe
                  width="560"
                  height="315"
                  src={project.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video controls>
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
          <div className={styles.carousel}>
            {project.images && (
              <Carousel
                className="w-5/6"
                opts={{ loop: true }}
                plugins={[
                  AutoPlay({
                    delay: project.delay || 4000,
                    stopOnFocusIn: true,
                  }),
                ]}
              >
                <CarouselContent>
                  {project.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className={styles.imageCard}>
                            <Image
                              src={image}
                              alt={`Project Image ${index + 1}`}
                              width={1600}
                              height={900}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </div>
          <div className={styles.btnBox}>
            {project.btns.map((btn, index) => (
              <button key={index} className={styles.linkBtn}>
                {btn.svgEle}
                <a
                  href={btn.url}
                  target={
                    btn.url.includes("trouble-shooting") ? "_self" : "_blank"
                  }
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {btn.title}
                </a>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Detail;
