def get_user_email():
    return None if auth.user is None else auth.user.email

db.define_table('weave',
                Field('title'),
                Field('purpose'),
                Field('creator', default=get_user_email())
                )

db.define_table('weave_membership',
                Field('user_email'),
                Field('user_id', 'reference auth_user'),
                Field('weave_id', 'reference weave'),
                Field('weave_title'),
                )