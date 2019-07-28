--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4 (Debian 11.4-1.pgdg90+1)
-- Dumped by pg_dump version 11.2

-- Started on 2019-07-28 14:31:40 MSK

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 198 (class 1259 OID 16396)
-- Name: announcement; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.announcement (
    id integer NOT NULL,
    text character varying NOT NULL,
    posted boolean DEFAULT false NOT NULL
);


ALTER TABLE public.announcement OWNER TO root;

--
-- TOC entry 200 (class 1259 OID 16413)
-- Name: answer; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.answer (
    id integer NOT NULL,
    text character varying NOT NULL,
    "isRight" boolean DEFAULT false NOT NULL,
    "questionId" integer NOT NULL
);


ALTER TABLE public.answer OWNER TO root;

--
-- TOC entry 197 (class 1259 OID 16387)
-- Name: migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO root;

--
-- TOC entry 196 (class 1259 OID 16385)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO root;

--
-- TOC entry 2914 (class 0 OID 0)
-- Dependencies: 196
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 199 (class 1259 OID 16405)
-- Name: question; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.question (
    id integer NOT NULL,
    text character varying NOT NULL
);


ALTER TABLE public.question OWNER TO root;

--
-- TOC entry 201 (class 1259 OID 16422)
-- Name: user; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."user" (
    "chatId" integer NOT NULL,
    login character varying NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    state integer DEFAULT 0 NOT NULL,
    score integer DEFAULT 0 NOT NULL,
    "currentQuestionId" integer,
    "answeredQuestionsIds" character varying DEFAULT ''::character varying NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."user" OWNER TO root;

--
-- TOC entry 2761 (class 2604 OID 16390)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 2905 (class 0 OID 16396)
-- Dependencies: 198
-- Data for Name: announcement; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.announcement (id, text, posted) FROM stdin;
\.


--
-- TOC entry 2907 (class 0 OID 16413)
-- Dependencies: 200
-- Data for Name: answer; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.answer (id, text, "isRight", "questionId") FROM stdin;
\.


--
-- TOC entry 2904 (class 0 OID 16387)
-- Dependencies: 197
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1564311430625	Init1564311430625
\.


--
-- TOC entry 2906 (class 0 OID 16405)
-- Dependencies: 199
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.question (id, text) FROM stdin;
\.


--
-- TOC entry 2908 (class 0 OID 16422)
-- Dependencies: 201
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."user" ("chatId", login, "firstName", "lastName", state, score, "currentQuestionId", "answeredQuestionsIds", "isActive") FROM stdin;
\.


--
-- TOC entry 2915 (class 0 OID 0)
-- Dependencies: 196
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- TOC entry 2777 (class 2606 OID 16433)
-- Name: user PK_1cfa1784ac9e67d4be782f4e5b8; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_1cfa1784ac9e67d4be782f4e5b8" PRIMARY KEY ("chatId");


--
-- TOC entry 2773 (class 2606 OID 16412)
-- Name: question PK_21e5786aa0ea704ae185a79b2d5; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY (id);


--
-- TOC entry 2769 (class 2606 OID 16395)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 2775 (class 2606 OID 16421)
-- Name: answer PK_9232db17b63fb1e94f97e5c224f; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY (id);


--
-- TOC entry 2771 (class 2606 OID 16404)
-- Name: announcement PK_e0ef0550174fd1099a308fd18a0; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.announcement
    ADD CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY (id);


--
-- TOC entry 2779 (class 2606 OID 16435)
-- Name: user REL_1f400292cf7ea23b570abe7228; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_1f400292cf7ea23b570abe7228" UNIQUE ("currentQuestionId");


--
-- TOC entry 2781 (class 2606 OID 16441)
-- Name: user FK_1f400292cf7ea23b570abe72284; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_1f400292cf7ea23b570abe72284" FOREIGN KEY ("currentQuestionId") REFERENCES public.question(id);


--
-- TOC entry 2780 (class 2606 OID 16436)
-- Name: answer FK_a4013f10cd6924793fbd5f0d637; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.answer
    ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES public.question(id);


-- Completed on 2019-07-28 14:31:40 MSK

--
-- PostgreSQL database dump complete
--

