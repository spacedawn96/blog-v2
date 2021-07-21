import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import card from './card.module.scss';
import media from '../../lib/styles/media';

const FollowButtonTap = styled.div`
  ${media.custom(1500)} {
    display: none;
  }
`;

export type FollowButtonProps = {
  username?: string;
  followHandleSubmit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  error?: any;
  unFollowHandleSubmit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  unfollowError?: any;
  BooleanIsFollowing: boolean;
};

function FollowButton(props: FollowButtonProps) {
  const dotClass = classNames(`${card.dot} ${card.two}`);
  const eyeClass = classNames(`${card.eye} ${card.right}`);
  const mouthClass = classNames(`${card.mouth} ${card.happy}`);
  const mouthSadClass = classNames(`${card.mouth} ${card.sad}`);
  const shadowClass = classNames(`${card.shadow} ${card.scale}`);
  const moveClass = classNames(`${card.shadow} ${card.move}`);

  return (
    <FollowButtonTap>
      {props.error || props.unfollowError ? (
        <div className={card.container}>
          <div className={card.errorBox}>
            <div className={card.dot} />
            <div className={dotClass} />
            <div className={card.FollowButton2}>
              <div className={card.eye} />
              <div className={eyeClass} />
              <div className={mouthSadClass} />
            </div>
            <div className={moveClass} />
            <div className={card.message}>
              <h1 className={card.alert}>Error!</h1>
              <p>
                {props.error?.graphQLErrors.map(({ message }, i) => (
                  <span key={i}>{message}</span>
                ))}
              </p>
            </div>
            <button className={card.buttonBox}>
              <h1 className={card.red}>try again</h1>
            </button>
          </div>
        </div>
      ) : (
        <div className={card.container}>
          <div className={card.successBox}>
            <div className={dotClass} />
            <div className={card.dot} />
            <div className={card.FollowButton}>
              <div className={card.eye} />
              <div className={eyeClass} />
              <div className={mouthClass} />
            </div>
            <div className={shadowClass} />
            <div className={card.message}>
              <h1 className={card.alert}>Follow me!</h1>
              <div>By {props.username}</div>
            </div>
            {/* {props.BooleanIsFollowing && !loading && data.me ? (
              <button className={card.buttonBox} onClick={props.unFollowHandleSubmit}>
                <h1 className={card.green}>
                  <span>Unfollow</span>
                </h1>
              </button>
            ) : (
              <button className={card.buttonBox} onClick={props.followHandleSubmit}>
                <h1 className={card.green}>
                  <span>Follow</span>
                </h1>
              </button>
            )} */}
          </div>
        </div>
      )}
    </FollowButtonTap>
  );
}

export default FollowButton;
