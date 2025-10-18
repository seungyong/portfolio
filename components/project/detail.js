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
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.title}>{project.name}</CardTitle>
        {project.date.length > 1 ? (
          project.date.map((date, index) => (
            <p key={index} className={styles.date}>
              <span className="text-muted-foreground">{index + 1}차 개발</span>
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
            <video controls>
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <div className={styles.carousel}>
          {project.images && (
            <Carousel
              className="w-5/6"
              opts={{ loop: true }}
              plugins={[AutoPlay({ delay: 4000 })]}
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
          <button className={styles.linkBtn}>
            <Image src="/github.svg" alt="GitHub" width={24} height={24} />
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Detail;
