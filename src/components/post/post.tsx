import { PostType } from "@/types";
import {
  Anchor,
  Box,
  Center,
  Frame,
  Grid,
  Heading,
  Separator,
  Stack,
  Switcher,
  Text,
} from "@gaze-ui/react";
import Image from "next/image";
import * as React from "react";
import styles from "./post.module.css";
import Giscus from "@giscus/react";

export interface PostProps {
  post: PostType;
}

export const Post = ({ post }: PostProps): JSX.Element => {
  return (
    <Center maxWidth="100rem" gutter="var(--size-space-50)">
      <Stack space="var(--size-space-30)">
        {post.title && <Heading as="h1">{post.title}</Heading>}
        {post.description && (
          <Text fontSize="var(--size-font-2xl)">{post.description}</Text>
        )}
        <Switcher space="var(--size-space-50)" threshold="90rem" limit={2}>
          <Stack space="var(--size-space-50)" className={styles.man}>
            <Text>
              The following content was typewritten by a human on a {post.model}{" "}
              typewriter.
              <span className={styles.skipLink}>
                {" "}
                <Anchor href="#machine-translation">
                  Skip to the machine translation.
                </Anchor>
              </span>
            </Text>
            {post.contents?.map((content, i) => (
              <Image
                key={`${content.imgSrc}-img`}
                src={require(
                  `../../posts/${post.slug}/content/${content.imgSrc}`
                )}
                alt={`${post.title} page ${i + 1}`}
                placeholder="blur"
                aria-describedby={`page-${i}`}
              />
            ))}
          </Stack>
          <Stack space="var(--size-space-50)" id="machine-translation">
            <Text>
              The following content was machine translated from the typewritten
              text.
            </Text>
            <Box
              background="var(--color-slate-900)"
              padding="var(--size-space-100)"
              borderRadius="var(--size-radius-md)"
              data-invert={true}
            >
              {post.contents && (
                <Stack space="var(--size-space-100)">
                  {post.contents?.map((content, i) => (
                    <React.Fragment key={`${content.imgSrc}-text`}>
                      <Stack
                        space="var(--size-space-20)"
                        className={styles.machine}
                        id={`page-${i}`}
                      >
                        {content.text.split("\n\n").map((paragraph) => (
                          <Text fontSize="var(--size-font-xl)" key={paragraph}>
                            {paragraph}
                          </Text>
                        ))}
                      </Stack>
                      {i < (post.contents?.length || 0) - 1 && (
                        <Separator
                          variant="dotted"
                          thickness="var(--size-border-2)"
                          color="var(--color-white)"
                        />
                      )}
                    </React.Fragment>
                  ))}
                </Stack>
              )}
            </Box>
          </Stack>
        </Switcher>
        <Box>
          <Giscus
            id="comments"
            repo="jnlsn/nlsn"
            repoId="R_kgDOHr3AvQ"
            category="General"
            categoryId="DIC_kwDOHr3Avc4CXiSz"
            mapping="specific"
            term={post.title}
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang="en"
            loading="lazy"
          />
        </Box>
      </Stack>
    </Center>
  );
};
