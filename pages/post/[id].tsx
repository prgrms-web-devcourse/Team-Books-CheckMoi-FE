import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/router";
import { Divider, Tabs, Tab } from "@mui/material";
import * as S from "../../styles/PostStyle";
import { CommentInput } from "../../components/CommentInput";

// TODO api가 완성되면 Type과 api 작업 필요
const PostPage = () => {
  // TODO StudyDetail 페이지에서 value 쿼리 전달받아서 저장해야함
  const router = useRouter();

  const { studyId, tabNumber } = router.query;
  const currentTab = tabNumber ? +tabNumber : 0;
  const [value, setValue] = useState(currentTab);

  // TODO api 연결 후 지울 변수
  const DATE = "2022/08/05";
  const [year, month, day] = DATE.split("/");

  const handleTabChange = (e: SyntheticEvent, newValue: number) => {
    router.push({
      pathname: `/study/${studyId}`,
      query: { tabNumber: newValue },
    });
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="공지" />
        <Tab label="자유" />
      </Tabs>
      <S.BoardTitle>Legal Abortion Is Not a Polarizing Issue</S.BoardTitle>
      <S.BoardInfo>
        <S.StyledAvatar src="https://i.picsum.photos/id/962/200/300.jpg?hmac=wvuv8EVOoNE5J3sBkBx-1wcVHNbgJ_Z1dS98YhnShjM" />
        <S.AvatarName>박인화</S.AvatarName>
        <div>·</div>
        <S.BoardCreateDate>
          {year}년 {month}월 {day}일
        </S.BoardCreateDate>
      </S.BoardInfo>
      <Divider />
      <S.BoardContent>
        It has become an axiom of political and sociological thought that we are
        a divided country. Blue states, red states, 50–50, two sides that
        absolutely cannot understand what the other side could possibly be
        thinking — we can’t come together on anything. It is my experience,
        walking around the earth (rather than staring at social media or
        watching cable news all day), that this is not the case. There are
        people with whom I fundamentally disagree on some issues that I
        completely agree with on others. There are people I am mostly aligned
        with politically who are assholes; there are people on the opposite
        sides of every issue from me that are truly kind, good-hearted people.
        This is not a difficult concept to understand for any human except those
        overly invested in social media, an institution that seems specifically
        designed to dehumanize anyone who doesn’t share your precise life
        experience. Life is a rich pageant, and every person is complicated.
        Nothing is split down the middle. Nothing, and no one, is purely good,
        or purely bad. If you find someone who claims they are, they are
        pretending. They are lying to themselves.
        <br />
        <br />
        But this sense that our country is somehow 50–50 persists, particularly
        among those so entrenched in their own all-or-nothing mindsets that
        accepting otherwise would require them to re-analyze their worldview in
        a way that could prove psychologically challenging. And I’m not sure
        this is any more true than in the issue of abortion. Abortion,
        essentially my entire life, has always been seen as a bit of a third
        rail: You always have to be careful whom you bring it up around. The
        accepted wisdom — particularly among corporations and public figures
        looking not to alienate a large percentage of their customers and
        followers — was that whatever side you came down on on the abortion
        debate, you’d infuriate half the country. Half the people were
        pro-choice, half were pro-life, neither would ever back down from their
        position, there was no winning over anybody. Best just to stay out of
        it.
        <br />
        <br />
        But this is not true, and may never have been true. Much of this may
        come down to the way these “debates” have been framed. Being “pro-life”
        is not, in fact, the opposite of being “pro-choice.” Someone can believe
        that an abortion is tragic, or even that it’s inherently against their
        religion, and still believe a woman should have the right to have one.
        Someone can believe abortion is health care and still be wary of a
        third-trimester abortion (an extremely rare procedure that’s mostly used
        as a rhetorical scare tactic) that doesn’t directly affect the health of
        the mother. Someone can fight any sort of stigma being involved with
        abortion and still struggle emotionally with their own history with it.
        The world is big and complicated. Nothing is simply black or white.
        <br />
        <br />
        But one thing is increasingly clear, now that Roe v. Wade has been
        overturned: This country is not polarized, or split, about whether or
        not abortion should be legal. This country believes it should be. By a
        large margin.
        <br />
        <br />
        Polls have shown for years that between 62–70 percent of Americans
        believe abortion should be legal in all or most cases, but those are
        polls: The last few years of American political discourse, and its
        result, have given everyone a healthy suspicion of polls. And many of
        those polls were conducted before the Supreme Court struck down Roe v.
        Wade, something that many Americans believed would never actually
        happen. Now that it has, though: The numbers are looking even more
        stark. One need look no farther than Kansas.
        <br />
        <br />
        Last night, Kansas — a state that has not voted for a Democratic
        Presidential nominee since LBJ, and before him, FDR — became the first
        state to put an actual amendment on the ballot for voters, asking them
        whether or not there should be an amendment that removed the right to
        abortion from the state constitution. States that have taken away
        abortion rights, in the wake of Roe v. Wade, have generally done so via
        extremist state legislatures, where a bunch of old white guys get
        together to vote and say crazy-ass things like this:
        <br />
        <br />
        But this was an actual vote, with actual citizens, with actual
        consequences. In Kansas. And by a 59–41 margin — in Kansas! — the
        amendment was shot down. This is a state that voted for Trump over Biden
        56–42. It is one of the reddest states in the union. And it wants
        abortion to be legal … by a huge, huge amount. From The New York Times
        story:
        <br />
        <br />
        Registered Republicans far outnumber Democrats in Kansas — and abortion
        rights activists made explicit appeals to unaffiliated voters and
        center-right voters. In interviews last week in populous Johnson County,
        Kan., a number of voters said they were registered Republicans but
        opposed the amendment — a dynamic that almost certainly played out
        across the state, given the margin.
        <br />
        <br />
        “We’re watching the votes come in, we’re seeing the changes of some of
        the counties where Donald Trump had a huge percentage of the vote, and
        we’re seeing that just decimated,” said Jo Dee Adelung, 63, a Democrat
        from Merriam, Kan., who knocked on doors and called voters in recent
        weeks.
      </S.BoardContent>
      <Divider />
      <CommentInput />
      {/* TODO Comment List 출력 */}
    </>
  );
};

export default PostPage;
